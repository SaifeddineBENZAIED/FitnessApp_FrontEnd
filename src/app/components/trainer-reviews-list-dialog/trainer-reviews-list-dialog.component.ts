import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainersService } from '../../services/trainers/trainers.service';

@Component({
  selector: 'app-trainer-reviews-list-dialog',
  templateUrl: './trainer-reviews-list-dialog.component.html',
  styleUrl: './trainer-reviews-list-dialog.component.scss'
})
export class TrainerReviewsListDialogComponent implements OnInit {
  reviews: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TrainerReviewsListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainerService: TrainersService
  ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.trainerService.getTrainerReviews(this.data.trainer.id).subscribe(reviews => {
      this.reviews = reviews.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
