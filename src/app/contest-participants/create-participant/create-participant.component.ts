import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestParticipantsService, ContestParticipantsResrep } from '../contest-participants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-participant',standalone:false,
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.scss']
})
export class CreateParticipantComponent implements OnInit {
  participantForm: FormGroup;
  submissionError = '';
  constructor(
    private fb: FormBuilder,
    private participantService: ContestParticipantsService,
    private router: Router
  ) {
    this.participantForm = this.fb.group({
      sh_id: ['', Validators.required],
      contestId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  ngOnInit(): void { }
  onSubmit(): void {
    if (this.participantForm.invalid) {
      return;
    }
    const formValue = { ...this.participantForm.value } as ContestParticipantsResrep;
    // Ensure contestId is a number
    formValue.contestId = +formValue.contestId;
    this.participantService.createParticipant(formValue).subscribe({
      next: (data) => {
        alert('Participant created successfully!');
        // Navigate to list page or show success message
        this.router.navigate(['/contest-participants']);
      },
      error: (err) => {
        console.error('Error creating participant', err);
        this.submissionError = 'Error creating participant. Please try again.';
      }
    });
  }
}