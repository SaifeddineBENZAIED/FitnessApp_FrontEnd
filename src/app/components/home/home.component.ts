import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  goals: string[] = ['Lose Weight', 'Gain Muscle', 'Maintain Fitness'];
  currentGoal: string = '';
  currentGoalIndex: number = 0;
  typingSpeed: number = 150;
  deletingSpeed: number = 100;
  typingDelay: number = 2000;
  
  isAuthenticated: boolean = false;
  user: any;

  services = [
    { name: 'Exercises', icon: 'fitness_center', description: 'Explore a variety of exercises...', route: '/exercises' },
    { name: 'Recommendations', icon: 'recommend', description: 'Personalized exercise plans...', route: '/recommendations' },
    { name: 'Meal Plans', icon: 'restaurant_menu', description: 'Tailored meal plans for you...', route: '/meals' },
    { name: 'Trainers', icon: 'group', description: 'Connect with professional trainers...', route: '/trainers' }
  ];

  calculators = [
    { name: 'BMI Calculator', icon: 'calculate', description: 'Calculate your BMI...', route: '/bmi-calculator' },
    { name: 'Calorie Calculator', icon: 'calculate', description: 'Estimate your calorie needs...', route: '/calorie-calculator' },
    { name: 'BMR Calculator', icon: 'calculate', description: 'Determine your Basal Metabolic Rate...', route: '/bmr-calculator' },
    { name: 'Body Fat Percentage', icon: 'calculate', description: 'Calculate your body fat percentage...', route: '/body-fat-calculator' },
    { name: 'WHR Calculator', icon: 'calculate', description: 'Calculate your Waist-to-Hip Ratio...', route: '/whr-calculator' }
  ];

  slides = [
    { src: 'assets/fitness1.jpg' },
    { src: 'assets/fitness5.jpg' },
    { src: 'assets/fitness6.jpg' }
  ];

  randomMotivation: string = '';

  // List of motivational quotes
  motivations: string[] = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It’s your mind that you have to convince.",
    "Don’t limit your challenges. Challenge your limits.",
    "Success starts with self-discipline.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "You don’t have to be extreme, just consistent.",
    "Take care of your body. It’s the only place you have to live.",
    "Push yourself because no one else is going to do it for you.",
    "The hard part isn’t getting your body in shape. The hard part is getting your mind in shape.",
    "Sweat is fat crying.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "The difference between try and triumph is a little ‘umph’.",
    "You’re only one workout away from a good mood.",
    "Success isn’t always about greatness. It’s about consistency.",
    "Believe you can, and you’re halfway there.",
    "Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.",
    "What seems impossible today will one day become your warm-up.",
    "Motivation is what gets you started. Habit is what keeps you going.",
    "A one-hour workout is 4% of your day. No excuses.",
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
    "Fitness is not about being better than someone else. It’s about being better than you used to be."
  ];

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.authService.getUserInfo().subscribe({
        next: (user) => {
          this.user = user;
        }, error: (error) => {
          console.error('Failed to fetch user info', error);
        }
      });
      this.getRandomMotivation();
      setTimeout(() => this.hideMotivation(), 15000);
    }
    this.typeGoal();
  }

  getRandomMotivation(): void {
    const randomIndex = Math.floor(Math.random() * this.motivations.length);
    this.randomMotivation = this.motivations[randomIndex];
  }

  hideMotivation() {
    this.randomMotivation = '';
  }

  navigateTo(route: string): void {
    if (this.isAuthenticated) {
      this.router.navigate([route]);
    } else {
      this.snackBar.open('You need to log in to access this content', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  navigateToCalculators(): void {
    this.router.navigate(['/calculators']);
  }

  register(): void {
    this.router.navigate([`/register`]);
  }

  redirectToLogin(): void {
    this.router.navigate([`/login`]);
  }

  typeGoal(): void {
    const goal = this.goals[this.currentGoalIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex < goal.length) {
        this.currentGoal += goal.charAt(charIndex);
        charIndex++;
        setTimeout(type, this.typingSpeed);
      } else {
        setTimeout(() => this.deleteGoal(), this.typingDelay);
      }
    };

    type();
  }

  deleteGoal(): void {
    let charIndex = this.currentGoal.length;

    const deleteChar = () => {
      if (charIndex > 0) {
        this.currentGoal = this.currentGoal.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteChar, this.deletingSpeed);
      } else {
        this.currentGoalIndex = (this.currentGoalIndex + 1) % this.goals.length;
        setTimeout(() => this.typeGoal(), this.typingSpeed);
      }
    };

    deleteChar();
  }

}
