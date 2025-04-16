import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContestService, ContestResrep, ContestResultPostResRep } from '../../contests/contests.service';
import { ContestParticipantsService, ContestParticipantsResrep } from '../../contest-participants/contest-participants.service';
import { ContestProblemService } from '../../contest-problems/contest-problem.service';
import { SolvedProblemService, SolvedProblemsPostResRep } from '../../solved-problems/solved-problems.service';
import { ContestProblemResrep } from '../../models/contest-problem-resrep.model';

@Component({
  selector: 'app-create-contest-result',standalone:false,
  templateUrl: './create-contest-result.component.html',
  styleUrls: ['./create-contest-result.component.scss']
})
export class CreateContestResultComponent implements OnInit {
  // List of completed contests (for radio selection)
  completedContests: ContestResrep[] = [];
  // Currently selected contest ID
  selectedContestId: number | null = null;
  // Loaded contest problems for the selected contest
  contestProblems: ContestProblemResrep[] = [];
  // Loaded participants for the selected contest (using sh_id as their unique identifier)
  participants: ContestParticipantsResrep[] = [];
  // Nested object to hold scores: { [sh_id]: { [problemId]: score } }
  scores: { [sh_id: string]: { [problemId: number]: number } } = {};
  // New nested object to hold extra contest result data (rank and status) per participant.
  resultExtras: { [sh_id: string]: { rank: number, status: string } } = {};

  // Flags for loading state and error messages
  loadingContests: boolean = false;
  loadingParticipants: boolean = false;
  errorMessage: string = '';

  constructor(
    private contestService: ContestService,
    private participantService: ContestParticipantsService,
    private problemService: ContestProblemService,
    private solvedProblemService: SolvedProblemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompletedContests();
  }
  getInputValue(event: Event): number {
    return (event.target as HTMLInputElement).valueAsNumber;
  }
  
  // Load completed contests using ContestService
  loadCompletedContests(): void {
    this.loadingContests = true;
    this.contestService.getCompletedContests().subscribe({
      next: (contests: ContestResrep[]) => {
        this.completedContests = contests;
        this.loadingContests = false;
      },
      error: (err: any) => {
        console.error('Error loading completed contests', err);
        this.errorMessage = 'Error loading contests.';
        this.loadingContests = false;
      }
    });
  }

  // Called when an admin selects a contest via a radio button.
  onContestSelect(contestId: number): void {
    this.selectedContestId = contestId;
    // Load contest problems and participants concurrently for the selected contest.
    this.loadContestProblems(contestId);
    this.loadParticipants(contestId);
  }

  // Load contest problems for the selected contest.
  loadContestProblems(contestId: number): void {
    this.problemService.getProblemsByContestId(contestId).subscribe({
      next: (problems: ContestProblemResrep[]) => {
        this.contestProblems = problems;
        this.initializeScoreAndExtraFields();
      },
      error: (err: any) => {
        console.error('Error loading contest problems', err);
        this.errorMessage = 'Error loading contest problems.';
      }
    });
  }

  // Load participants for the selected contest.
  loadParticipants(contestId: number): void {
    this.loadingParticipants = true;
    this.participantService.getParticipantsByContestId(contestId).subscribe({
      next: (participants: ContestParticipantsResrep[]) => {
        this.participants = participants;
        this.loadingParticipants = false;
        this.initializeScoreAndExtraFields();
      },
      error: (err: any) => {
        console.error('Error loading participants', err);
        this.errorMessage = 'Error loading participants.';
        this.loadingParticipants = false;
      }
    });
  }

  // Initialize the score fields and extra fields (for rank and status) for each participant and each contest problem.
  initializeScoreAndExtraFields(): void {
    if (this.participants.length && this.contestProblems.length) {
      for (let participant of this.participants) {
        // Initialize scores if not present.
        if (!this.scores[participant.sh_id]) {
          this.scores[participant.sh_id] = {};
        }
        // Initialize resultExtras for rank and status if not present.
        if (!this.resultExtras[participant.sh_id]) {
          this.resultExtras[participant.sh_id] = { rank: 0, status: 'result-not-set' };
        }
        for (let problem of this.contestProblems) {
          // Use problem.contest_problem_id (if that's your property) for the key.
          if (this.scores[participant.sh_id][problem.contest_problem_id] == null) {
            this.scores[participant.sh_id][problem.contest_problem_id] = 0;
          }
        }
      }
    }
  }

  // Called when a score input changes in the table.
  onScoreChange(sh_id: string, problemId: number, score: number): void {
    if (!this.scores[sh_id]) {
      this.scores[sh_id] = {};
    }
    this.scores[sh_id][problemId] = score;
  }

  // Submit the entered scores:
  // 1. Create bulk solved problems records.
  // 2. For each participant, calculate total score and create a contest result record using extra fields for rank and status.
  onSubmit(): void {
    if (!this.selectedContestId) {
      this.errorMessage = 'Please select a contest.';
      return;
    }

    // Prepare bulk payload for solved problems.
    const solvedPayload: SolvedProblemsPostResRep[] = [];
    for (let participant of this.participants) {
      for (let problem of this.contestProblems) {
        solvedPayload.push({
          contest_id: this.selectedContestId,
          contest_participant_id: participant.sh_id,
          contest_problem_id: problem.contest_problem_id,
          score: this.scores[participant.sh_id][problem.contest_problem_id]
        });
      }
    }

    // Submit solved problems in bulk.
    this.solvedProblemService.submitSolvedProblems(solvedPayload).subscribe({
      next: () => {
        // Now, for each participant, calculate the total score and submit a contest result record.
        this.participants.forEach(participant => {
          const totalScore = this.contestProblems.reduce((sum, problem) => {
            return sum + (this.scores[participant.sh_id][problem.contest_problem_id] || 0);
          }, 0);
          // Use the extra fields for rank and status from the resultExtras object.
          const extras = this.resultExtras[participant.sh_id];
          const resultPayload: ContestResultPostResRep = {
            contest_id: this.selectedContestId,
            participant_id: participant.sh_id,
            score: totalScore,
            rank_in_this_contest: extras.rank,
            status: extras.status
          };
          this.contestService.createContestResult(resultPayload).subscribe({
            next: () => console.log(`Contest result created for participant ${participant.sh_id}`),
            error: (err: any) => console.error('Error creating contest result', err)
          });
        });
        alert('All scores submitted successfully!');
        this.router.navigate(['/admin/contest-results']);
      },
      error: (err: any) => {
        console.error('Error submitting solved problems', err);
        this.errorMessage = 'Error submitting solved problems. Please try again.';
      }
    });
  }
}
