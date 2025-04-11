import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestService, ContestResrep, ContestResultPostResRep } from '../../contests/contests.service';
import { ContestParticipantsService, ContestParticipantsResrep } from '../../contest-participants/contest-participants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contest-result',
  standalone: false,
  templateUrl: './create-contest-result.component.html',
  styleUrls: ['./create-contest-result.component.scss']
})
export class CreateContestResultComponent implements OnInit {
  resultForm: FormGroup;
  submissionError = '';

  // List of completed contests (missing property added)
  completedContests: ContestResrep[] = [];
  // List of participants for a selected contest
  participants: ContestParticipantsResrep[] = [];

  constructor(
    private fb: FormBuilder,
    private contestService: ContestService,
    private participantService: ContestParticipantsService,
    private router: Router
  ) {
    // Initialize the form: all fields are required
    this.resultForm = this.fb.group({
      contest_id: [null, Validators.required],
      participant_id: [null, Validators.required],
      score: [0, [Validators.required, Validators.min(0)]],
      rank_in_this_contest: [0, [Validators.required, Validators.min(1)]],
      status: ['result-not-set', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCompletedContests();
    // When a contest is selected, load its participants.
    this.resultForm.get('contest_id')?.valueChanges.subscribe((contestId: number) => {
      if (contestId) {
        this.loadParticipants(contestId);
      } else {
        this.participants = [];
      }
    });
  }

  // Load completed contests from the backend.
  loadCompletedContests(): void {
    this.contestService.getCompletedContests().subscribe({
      next: (contests) => {
        this.completedContests = contests;
      },
      error: (err) => {
        console.error('Error loading completed contests', err);
        this.submissionError = 'Error loading contests';
      }
    });
  }

  // Load participants for a selected contest.
  loadParticipants(contestId: number): void {
    this.participantService.getParticipantsByContestId(contestId).subscribe({
      next: (participants) => {
        this.participants = participants;
      },
      error: (err) => {
        console.error('Error loading participants', err);
        this.submissionError = 'Error loading participants';
      }
    });
  }

  // Form submission handler: posts a new contest result.
  onSubmit(): void {
    if (this.resultForm.invalid) {
      return;
    }
    const payload: ContestResultPostResRep = { ...this.resultForm.value };

    this.contestService.createContestResult(payload).subscribe({
      next: () => {
        alert('Contest Result created successfully!');
        this.router.navigate(['/admin/contest-results']);
      },
      error: (err) => {
        console.error('Error creating contest result', err);
        this.submissionError = 'Error creating contest result. Please try again.';
      }
    });
  }
}
