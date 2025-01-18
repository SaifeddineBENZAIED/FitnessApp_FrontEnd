import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.scss'
})
export class PasswordResetConfirmComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  uid: string = '';
  token: string = '';
  linkValid: boolean = false;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.profileService.validateResetLink(this.uid, this.token).subscribe({
      next: (response) => {
        this.linkValid = response.valid;
        if (!this.linkValid) {
          this.snackBar.open('Invalid or expired link.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.snackBar.open('Invalid or expired link.', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.profileService.confirmPasswordReset(this.uid, this.token, this.newPassword).subscribe({
      next: (response) => {
        this.snackBar.open('Password has been reset successfully', 'Close', { duration: 3000 , panelClass: ['snack-success'] });
        this.router.navigate(['/login']); // Redirect to login after success
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.snackBar.open('Failed to reset password', 'Close', { duration: 3000 });
      }
    });
  }
}
