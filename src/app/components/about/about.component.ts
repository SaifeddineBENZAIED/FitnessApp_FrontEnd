import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  features = [
    {
      icon: 'fitness_center',
      title: 'Personalized Exercise Programs:',
      description:
        'Our AI-powered system creates customized workout plans based on your goals, fitness level, and preferences.',
    },
    {
      icon: 'library_books',
      title: 'Exercise Library:',
      description:
        'Access a vast collection of exercises, complete with descriptions and instructional videos to ensure correct form.',
    },
    {
      icon: 'restaurant',
      title: 'Meal Recommendations:',
      description:
        'Get meal plans tailored to your dietary preferences and fitness goals, helping you eat right to support your training.',
    },
    {
      icon: 'support',
      title: 'Expert Trainers:',
      description:
        'Connect with professional trainers for personalized advice, training programs, and support. Email or call them directly through our platform.',
    },
    {
      icon: 'calculate',
      title: 'Health Calculators:',
      description:
        'Use our health calculators to get insights into your fitness metrics and understand what you need to improve.',
    },
  ];

  isAuthenticated: boolean = false;
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.authService.getUserInfo().subscribe(
        (user) => {
          this.user = user;
        }
      ); // Assuming your AuthService has a method to get user info
    }
  }

  register(): void {
    this.router.navigate([`/register`]);
  }

  redirectToLogin(): void {
    this.router.navigate([`/login`]);
  }

}
