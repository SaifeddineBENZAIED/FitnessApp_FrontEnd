import { Component, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('fileInput') fileInput: any;

  registerForm: FormGroup;
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer = 'assets/userDefaultImg.webp';

  genders = ['Male', 'Female'];
  fitnessGoals = ['Lose Weight', 'Gain Muscle', 'Maintain Fitness'];
  activityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'];
  experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

  dietaryPreferences = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low-Carb', 'Keto'];
  medicalConditions = ['Diabetes', 'Hypertension', 'Asthma', 'Allergies', 'Heart Disease'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const formOptions: AbstractControlOptions = { validators: this.passwordMatchValidator };
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      fitness_goal: ['', Validators.required],
      activity_level: ['', Validators.required],
      experience_level: ['', Validators.required],
      phone_number: ['', [this.phoneNumberValidator]], 
      country: ['', [this.countryValidator]], 
      dietary_preferences: [[]], 
      medical_conditions: [[]] 
    }, formOptions);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();  // Programmatically trigger the file input
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedFile);
      fileReader.onload = (event) => {
        if (fileReader.result) {
          this.imageUrl = fileReader.result;
        }
      };
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    const phoneNumberPattern = /^[0-9\s]*$/;
    return phoneNumber && !phoneNumberPattern.test(phoneNumber) ? { invalidPhoneNumber: true } : null;
  }

  countryValidator(control: AbstractControl): ValidationErrors | null {
    const country = control.value;
    const countryPattern = /^[a-zA-Z\s]*$/;
    return country && !countryPattern.test(country) ? { invalidCountry: true } : null;
  }

  removePreference(preference: string): void {
    const preferences = this.registerForm.get('dietary_preferences')?.value;
    this.registerForm.get('dietary_preferences')?.setValue(preferences.filter((p: string) => p !== preference));
  }

  removeCondition(condition: string): void {
    const conditions = this.registerForm.get('medical_conditions')?.value;
    this.registerForm.get('medical_conditions')?.setValue(conditions.filter((c: string) => c !== condition));
  }

  compareFn(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlValue = this.registerForm.get(key)?.value;
      if (Array.isArray(controlValue)) {
        formData.append(key, controlValue.join(', '));
      } else {
        formData.append(key, controlValue);
      }
    });

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: (data) => {
        this.snackBar.open('Registration successful', 'Close', { duration: 3000, panelClass: ['snack-success'] });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.error.email) {
          this.snackBar.open(`Email error: ${error.error.email[0]}`, 'Close', { duration: 3000, panelClass: ['snack-error'] });
        } else if (error.error.username) {
          this.snackBar.open(`Username error: ${error.error.username[0]}`, 'Close', { duration: 3000, panelClass: ['snack-error'] });
        } else {
          this.snackBar.open('Registration failed! Please verify your information', 'Close', { duration: 3000, panelClass: ['snack-error'] });
        }
        this.errorMessage = error.error ? error.error.message : 'Registration failed! Please verify your information';
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

}
