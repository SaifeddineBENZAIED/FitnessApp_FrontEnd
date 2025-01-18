import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercisesService } from '../../services/exercises/exercises.service';

@Component({
  selector: 'app-exercise-detail-dialog',
  templateUrl: './exercise-detail-dialog.component.html',
  styleUrl: './exercise-detail-dialog.component.scss'
})
export class ExerciseDetailDialogComponent {

  muscleGroups: string[] = [];
  exercise: any = {};

  constructor(
    public dialogRef: MatDialogRef<ExerciseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exercise = data.exercises[0];

    // Since muscle_groups is already an array of strings from the API
    this.muscleGroups = this.exercise?.muscle_groups || [];

    // Parse the description to extract the "How to Do It" section
    this.exercise.howToDo = this.extractHowToDo(this.exercise.description);

    if (this.exercise?.video_url) {
      this.exercise.video_url = this.convertYouTubeUrlToEmbed(this.exercise.video_url);
    }
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/gymExDefaultImg.png';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  extractHowToDo(description: string): string | null {
    const howToDoIndex = description.indexOf('-How to Do It:');
    if (howToDoIndex !== -1) {
      return description.substring(howToDoIndex + 14).trim();
    }
    return null;
  }

  extractDescription(description: string): string {
    const howToDoIndex = description.indexOf('-How to Do It:');
    if (howToDoIndex !== -1) {
      return description.substring(0, howToDoIndex).trim();
    }
    return description;
  }

  // Converts YouTube URL to embed URL
  convertYouTubeUrlToEmbed(url: string): string {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === 'www.youtube.com') {
        const videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      return ''; // Return empty if URL is not a valid YouTube URL
    } catch {
      return ''; // Return empty for invalid URLs
    }
  }

}
