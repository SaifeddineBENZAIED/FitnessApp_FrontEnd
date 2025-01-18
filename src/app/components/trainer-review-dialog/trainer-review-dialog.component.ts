import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainersService } from '../../services/trainers/trainers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainer-review-dialog',
  templateUrl: './trainer-review-dialog.component.html',
  styleUrl: './trainer-review-dialog.component.scss'
})
export class TrainerReviewDialogComponent {
  reviewForm: FormGroup;

  constructor(
    private trainerService: TrainersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TrainerReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      // Pass the trainerId from the data object
      this.trainerService.addReview(this.data.trainer.id, this.reviewForm.value).subscribe(() => {
        this.snackBar.open('Review added successfully', 'Close', { duration: 3000 , panelClass: ['snack-success'] });
        this.dialogRef.close(this.reviewForm.value);
      });
    }
  }
}
