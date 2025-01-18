import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardServicesComponent } from './dashboard-services/dashboard-services.component';
import { DashboardAboutComponent } from './dashboard-about/dashboard-about.component';
import { DashboardCalculatorsComponent } from './dashboard-calculators/dashboard-calculators.component';
import { DashboardReviewComponent } from './dashboard-review/dashboard-review.component';

const routes: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'services', component: DashboardServicesComponent },
  { path: 'about', component: DashboardAboutComponent },
  { path: 'calculators', component: DashboardCalculatorsComponent },
  { path: 'review', component: DashboardReviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
