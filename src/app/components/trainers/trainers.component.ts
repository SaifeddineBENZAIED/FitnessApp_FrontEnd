import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../../services/trainers/trainers.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainerReviewDialogComponent } from '../trainer-review-dialog/trainer-review-dialog.component';
import { TrainerReviewsListDialogComponent } from '../trainer-reviews-list-dialog/trainer-reviews-list-dialog.component';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.scss'
})
export class TrainersComponent implements OnInit {
  trainers: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  filter: any = {};

  constructor(private trainerService: TrainersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTrainers();
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/trainerDefaultImg.png';
  }

  getTrainers(): void {
    this.trainerService.getTrainers(this.currentPage, this.filter).subscribe(response => {
      this.trainers = response.results;
      this.totalPages = Math.ceil(response.count / 5);
    });
  }

  search(): void {
    this.currentPage = 1;
    this.getTrainers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getTrainers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getTrainers();
    }
  }

  openReviewDialog(trainer: any): void {
    const dialogRef = this.dialog.open(TrainerReviewDialogComponent, {
      width: '500px',
      data: { trainer: trainer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTrainers();
      }
    });
  }

  viewReviews(trainer: any): void {
    this.dialog.open(TrainerReviewsListDialogComponent, {
      width: '700px',
      data: { trainer: trainer }
    });
  }
}
