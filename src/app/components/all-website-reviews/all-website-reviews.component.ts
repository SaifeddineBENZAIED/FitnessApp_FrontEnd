import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../../website/website.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-website-reviews',
  templateUrl: './all-website-reviews.component.html',
  styleUrl: './all-website-reviews.component.scss'
})
export class AllWebsiteReviewsComponent implements OnInit {

  allReviews: any[] = [];
  currentSlide: number = 0;

  constructor(private reviewService: WebsiteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadAllReviews();
  }

  loadAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      {
        next: reviews => {
          this.allReviews = reviews;
          if(this.allReviews.length === 0){
            this.snackBar.open('No reviews found', 'Close', { duration: 3000 });
          }
        }, error : () => {
          this.snackBar.open('Error fetching review', 'Close', { duration: 3000 });
        }
      }
    );
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
  
  nextSlide(): void {
    if (this.currentSlide < this.allReviews.length - 1) {
      this.currentSlide++;
    }
  }
}
