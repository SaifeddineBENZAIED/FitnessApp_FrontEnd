import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fitness_website_front';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.fetchCsrfToken();
    if(this.authService.isAuthenticated()){
      this.authService.getUserImg();
    }
  }
}
