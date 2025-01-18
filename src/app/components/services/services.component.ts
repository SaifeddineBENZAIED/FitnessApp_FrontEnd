import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  constructor(private router: Router) {}

  navigateTo(service: string): void {
    this.router.navigate([`/${service}`]);
  }
}
