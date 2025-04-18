import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestService } from '../contests.service';
import { ContestProblemService} from '../../contest-problems/contest-problem.service';
import { ContestProblemResrep } from '../../models/contest-problem-resrep.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-create',standalone:false,
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.scss']
})
export class ContestCreateComponent implements OnInit {
  contestForm: FormGroup;
  submissionError = '';
  contestProblemsOptions: ContestProblemResrep[] = [];
  selectedProblems: number[] = [];

  constructor(
    private fb: FormBuilder,
    private contestService: ContestService,
    private contestProblemService: ContestProblemService,
    private router: Router
  ) {
    // Initialize the reactive form
    this.contestForm = this.fb.group({
      contest_date: ['', Validators.required],
      contest_name: ['', [Validators.required, Validators.maxLength(100)]],
      total_participants: [0, [Validators.required, Validators.min(0)]],
      contest_link: ['', Validators.required],
      status: ['scheduled', Validators.required],
      contest_description: ['', Validators.required],
      // using an array for selected contest problem IDs
      contestProblemIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    // this.loadContestProblems();
  }

  loadContestProblems(contestId: number): void {
    this.contestProblemService.getProblemsByContestId(contestId).subscribe({
      next: (problems: ContestProblemResrep[]) => {
        this.contestProblemsOptions = problems;
      },
      error: (err: any) => {  // add type annotation to err
        console.error('Error loading contest problems', err);
      }
    });
  }
  
  onCheckboxChange(event: any): void {
    const problemId = +event.target.value;
    if (event.target.checked) {
      // Add the problemId if not already selected
      if (!this.selectedProblems.includes(problemId)) {
        this.selectedProblems.push(problemId);
      }
    } else {
      // Remove the problemId
      this.selectedProblems = this.selectedProblems.filter(id => id !== problemId);
    }
    // Update the form control for contestProblemIds
    this.contestForm.patchValue({
      contestProblemIds: this.selectedProblems
    });
  }
  isProblemSelected(problemId: number): boolean {
    return this.selectedProblems.includes(problemId);
  }
  onSubmit(): void {
    if (this.contestForm.invalid) {
      return;
    }
    const payload = { ...this.contestForm.value };
    // Convert total_participants to string if needed
    payload.total_participants = payload.total_participants.toString();

    // If contestProblemIds is coming as a comma-separated string, process it:
    if (typeof payload.contestProblemIds === 'string') {
      payload.contestProblemIds = payload.contestProblemIds.split(',').map((id: string) => +id.trim());
    }

    this.contestService.createContest(payload).subscribe({
      next: () => {
        alert('Contest created successfully!');
        this.router.navigate(['/admin/contests']); // Adjust based on your route configuration
      },
      error: (err) => {
        console.error('Error creating contest', err);
        this.submissionError = 'There was an error creating the contest. Please try again.';
      }
    });
  }
}