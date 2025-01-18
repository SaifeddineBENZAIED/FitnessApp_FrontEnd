import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private profileService: ProfileService, private snackBar: MatSnackBar, private router: Router) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('New passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.profileService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (response) => {
        this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 , panelClass: ['snack-success'] });
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.router.navigate([`/profile`]);
      },
      error: (error) => {
        console.error('Error changing password:', error);
        this.snackBar.open('Failed to change password', 'Close', { duration: 3000 });
      }
    });
  }
}
