import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.scss']
})
export class CalculatorsComponent {
  @ViewChild('bmiModal') bmiModal!: TemplateRef<any>;
  @ViewChild('bmrModal') bmrModal!: TemplateRef<any>;
  @ViewChild('calorieModal') calorieModal!: TemplateRef<any>;
  @ViewChild('bodyFatModal') bodyFatModal!: TemplateRef<any>;
  @ViewChild('whrModal') whrModal!: TemplateRef<any>;

  height!: number;
  weight!: number;
  age!: number;
  gender!: string;
  activityLevel!: string;
  waist!: number;
  neck!: number;
  hip?: number; // Make hip optional initially
  bmi!: number;
  bmr!: number;
  calorieNeeds!: number;
  bodyFatPercentage!: number;
  whr!: number;

  constructor(private modalService: NgbModal) {}

  navigateTo(modal: TemplateRef<any>) {
    this.resetFields();
    this.modalService.open(modal, { centered: true });
  }

  closeModal() {
    this.resetFields();
    this.modalService.dismissAll();
  }

  resetFields() {
    this.height = NaN;
    this.weight = NaN;
    this.age = NaN;
    this.gender = '';
    this.activityLevel = '';
    this.waist = NaN;
    this.neck = NaN;
    this.hip = NaN;
    this.bmi = NaN;
    this.bmr = NaN;
    this.calorieNeeds = NaN;
    this.bodyFatPercentage = NaN;
    this.whr = NaN;
  }

  calculateBMI() {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      this.bmi = this.weight / (heightInMeters * heightInMeters);
    }
  }

  calculateBMR() {
    if (this.height && this.weight && this.age && this.gender) {
      if (this.gender === 'male') {
        this.bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
      } else {
        this.bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
      }
    }
  }

  calculateCalorieNeeds() {
    if (this.height && this.weight && this.age && this.gender && this.activityLevel) {
      let bmr = 0;
      if (this.gender === 'male') {
        bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
      } else {
        bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
      }
      let activityFactor = 1.2; // Sedentary
      switch (this.activityLevel) {
        case 'lightly active':
          activityFactor = 1.375;
          break;
        case 'moderately active':
          activityFactor = 1.55;
          break;
        case 'very active':
          activityFactor = 1.725;
          break;
        case 'super active':
          activityFactor = 1.9;
          break;
      }
      this.calorieNeeds = bmr * activityFactor;
    }
  }

  calculateBodyFatPercentage() {
    if (this.gender && this.waist && this.neck && this.height) {
      const heightInMeters = this.height / 100;
      if (this.gender === 'male') {
        this.bodyFatPercentage = 86.010 * Math.log10(this.waist - this.neck) - 70.041 * Math.log10(heightInMeters) + 36.76;
      } else if (this.gender === 'female') {
        if (this.hip === undefined) {
          // Handle the case where hip measurement is missing
          alert("Hip measurement is required for females");
          return;
        }
        this.bodyFatPercentage = 163.205 * Math.log10(this.waist + this.hip - this.neck) - 97.684 * Math.log10(heightInMeters) - 78.387;
      }
    }
  }

  calculateWHR() {
    if (this.waist && this.hip) {
      this.whr = this.waist / this.hip;
    }
  }
}
