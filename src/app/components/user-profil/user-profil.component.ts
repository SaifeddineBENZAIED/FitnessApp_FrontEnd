import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  userProfile: any;
  profileForm: FormGroup;
  editMode = false;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  originalImageUrl: string | ArrayBuffer | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  genders = ['Male', 'Female'];
  fitnessGoals = ['Lose Weight', 'Gain Muscle', 'Maintain Fitness'];
  activityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'];
  experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

  dietaryPreferences = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Carb', 'Keto'];
  medicalConditions = ['Diabetes', 'Hypertension', 'Asthma', 'Allergies', 'Heart Disease'];

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }, Validators.required],
      username: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      fitness_goal: ['', Validators.required],
      activity_level: ['', Validators.required],
      experience_level: ['', Validators.required],
      phone_number: [''],
      country: [''],
      dietary_preferences: [[]],
      medical_conditions: [[]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/fitness-icon.jpg';
  }

  loadUserProfile(): void {
    this.authService.getUserInfo().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        profile.dietary_preferences = profile.dietary_preferences ? profile.dietary_preferences.split(', ') : [];
        profile.medical_conditions = profile.medical_conditions ? profile.medical_conditions.split(', ') : [];
        this.profileForm.patchValue(profile);
        this.imageUrl = profile.profile_image_url || 'assets/fitness-icon.jpg';
        this.originalImageUrl = this.imageUrl; // Store the original image URL
      }, 
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedFile);
      fileReader.onload = () => {
        this.imageUrl = fileReader.result as string; // For previewing the image
      };
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const updatedProfile = {
      ...this.profileForm.value,
      dietary_preferences: this.profileForm.value.dietary_preferences.join(', '),
      medical_conditions: this.profileForm.value.medical_conditions.join(', ')
    };

    const formData = new FormData();
    Object.keys(updatedProfile).forEach(key => {
      formData.append(key, updatedProfile[key]);
    });

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile);
    }

    this.profileService.updateUserProfile(formData).subscribe({
      next: () => {
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snack-success']
        });
        this.editMode = false;
        this.originalImageUrl = this.imageUrl; // Update original image URL to the new one
        this.loadUserProfile();
        this.authService.getUserImg();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.imageUrl = this.originalImageUrl; // Revert to the original image if edit mode is canceled
      this.selectedFile = null;

      // Clear the file input value to allow selecting the same file again later
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  cancelEdit(): void {
    this.toggleEditMode();
  }

  removePreference(preference: string): void {
    const preferences = this.profileForm.get('dietary_preferences')?.value.filter((p: string) => p !== preference);
    this.profileForm.get('dietary_preferences')?.setValue(preferences);
  }

  removeCondition(condition: string): void {
    const conditions = this.profileForm.get('medical_conditions')?.value.filter((c: string) => c !== condition);
    this.profileForm.get('medical_conditions')?.setValue(conditions);
  }
}
