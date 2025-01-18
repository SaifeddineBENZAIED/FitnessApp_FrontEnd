import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebsiteService } from '../../website/website.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-reviews-dialog',
  templateUrl: './edit-user-reviews-dialog.component.html',
  styleUrl: './edit-user-reviews-dialog.component.scss'
})
export class EditUserReviewsDialogComponent {
  editReviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reviewService: WebsiteService,
    public dialogRef: MatDialogRef<EditUserReviewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editReviewForm = this.fb.group({
      rating: [data.review.rating, [Validators.required, Validators.min(0), Validators.max(5)]],
      content: [data.review.content, Validators.required]
    });
  }

  submitEdit(): void {
    if (this.editReviewForm.invalid) {
      return;
    }

    const reviewData = this.editReviewForm.value;

    this.reviewService.editReview(this.data.review.id, reviewData).subscribe(
      {
        next: (response) => {
          console.log('Review updated:', response);
          this.snackBar.open('Review updated successfully', 'Close', { duration: 3000, panelClass: ['snack-success'] });
          this.dialogRef.close(true);
        }, error: () => {
          this.snackBar.open('Error updating review', 'Close', { duration: 3000 });
        }
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
