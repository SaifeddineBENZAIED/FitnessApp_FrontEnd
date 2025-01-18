import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  email: string = '';

  constructor(private profileService: ProfileService, private snackBar: MatSnackBar, private router: Router) {}

  onSubmit() {
    this.profileService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.snackBar.open('Password reset email sent', 'Close', { duration: 3000 , panelClass: ['snack-success'] });
        this.email = '';
        this.router.navigate([`/login`]);
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.snackBar.open('Failed to send reset email', 'Close', { duration: 3000 });
      }
    });
  }
}
