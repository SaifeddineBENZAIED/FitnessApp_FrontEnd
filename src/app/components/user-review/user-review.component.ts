import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteService } from '../../website/website.service';
import { AuthService } from '../../services/authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserReviewsDialogComponent } from '../edit-user-reviews-dialog/edit-user-reviews-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.scss'
})
export class UserReviewComponent implements OnInit {
  reviewForm: FormGroup;
  userReview: any = null;
  hasReview: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: WebsiteService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserReview();
  }

  loadUserReview(): void {
    this.reviewService.getUserReview().subscribe(
      review => {
        if (review.length > 0) {
          this.userReview = review[0];
          this.hasReview = true;
        }
      }
    );
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditUserReviewsDialogComponent, {
      width: '700px',
      data: { review: this.userReview }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserReview();
      }
    });
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    const reviewData = this.reviewForm.value;

    this.reviewService.addReview(reviewData).subscribe(
      response => {
        this.snackBar.open('Review added successfully', 'Close', {
          duration: 3000,
          panelClass: ['snack-success']
        });
        console.log('Review added:', response);
        this.loadUserReview();
      }
    );
  }
}
