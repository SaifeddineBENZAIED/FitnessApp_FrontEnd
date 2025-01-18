import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { CalculatorsComponent } from './components/calculators/calculators.component';
import { ReviewComponent } from './components/review/review.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ExercisesRecommandationComponent } from './components/exercises-recommandation/exercises-recommandation.component';
import { MealsRecommandationComponent } from './components/meals-recommandation/meals-recommandation.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServicesComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'calculators', component: CalculatorsComponent },
  { path: 'review', component: ReviewComponent, canActivate: [authGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [authGuard] },
  { path: 'recommendations', component: ExercisesRecommandationComponent, canActivate: [authGuard] },
  { path: 'meals', component: MealsRecommandationComponent, canActivate: [authGuard] },
  { path: 'trainers', component: TrainersComponent, canActivate: [authGuard] },
  { path: 'profile', component: UserProfilComponent, canActivate: [authGuard] },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-reset/confirm/:uid/:token', component: PasswordResetConfirmComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
