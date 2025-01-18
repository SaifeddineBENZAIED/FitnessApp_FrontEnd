import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../../services/exercises/exercises.service';
import { MusclesService } from '../../services/muscles/muscles.service';
import { ExerciseDetailDialogComponent } from '../exercise-detail-dialog/exercise-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  searchQuery: string = '';
  selectedMuscle: string = 'All'; // Add this property
  muscles: string[] = [];
  exercises: any[] = [];
  filteredExercises: any[] = [];
  paginatedExercises: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  constructor(private exercisesService: ExercisesService, private musclesServices: MusclesService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadMuscles();
    this.loadExercises();
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/gymExDefaultImg.png';
  }

  loadMuscles(): void {
    this.musclesServices.getMuscles().subscribe(data => {
      const muscleNames = data.map(muscle => muscle.name);
    
      // Prepend the "All" option to the muscle names list
      this.muscles = ['All', ...muscleNames];
    });
  }

  loadExercises(): void {
    this.exercisesService.getExercises().subscribe(data => {
      this.exercises = data;
      this.filteredExercises = data;
      this.updatePagination();
      this.checkEmptyExerciseslist();
    });
  }

  onSearchChange(): void {
    this.filterExercises();
  }

  searchExercises(): void {
    this.filterExercises();
  }

  filterByMuscle(muscle: string): void {
    this.selectedMuscle = muscle; // Set the selected muscle
    this.filterExercises();
  }

  filterExercises(): void {
    let filtered = this.exercises;

    if (this.searchQuery) {
      filtered = filtered.filter(exercise => exercise.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    if (this.selectedMuscle !== 'All') {
      filtered = filtered.filter(exercise => exercise.muscle_groups.some((m: { name: string; }) => m.name === this.selectedMuscle));
    }

    this.filteredExercises = filtered;
    this.updatePagination();
    this.checkEmptyExerciseslist();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredExercises.length / this.itemsPerPage);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedExercises = this.filteredExercises.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  openDialog(exercise: any): void {
    this.exercisesService.getExerciseByName(exercise.name).subscribe(data => {
      const dialogRef = this.dialog.open(ExerciseDetailDialogComponent, {
        width: '700px', // Adjust width as needed
        height: '1000px',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  checkEmptyExerciseslist(): void {
    if (this.exercises.length === 0 || this.filteredExercises.length === 0) {
      this.snackBar.open('No exercises Found !', 'Close', { duration: 3000 });
    }
  }

}
