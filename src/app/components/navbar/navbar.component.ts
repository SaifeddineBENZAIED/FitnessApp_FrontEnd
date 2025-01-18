import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;
  userImage: string = 'assets/fitness-icon.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.userImage$.subscribe((image: string) => {
      this.userImage = image;
    });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/fitness-icon.jpg';
  }

  navigateToHome(): void {
    this.router.navigate(['/']);  // Navigate to home when clicking on "Fitness Gym"
  }

  logout(): void {
    this.authService.logout();
  }

}
