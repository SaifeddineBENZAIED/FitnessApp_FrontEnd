import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { CalculatorsComponent } from './components/calculators/calculators.component';
import { AboutComponent } from './components/about/about.component';
import { ReviewComponent } from './components/review/review.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CarouselModule } from '@coreui/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { MealsRecommandationComponent } from './components/meals-recommandation/meals-recommandation.component';
import { ExercisesRecommandationComponent } from './components/exercises-recommandation/exercises-recommandation.component';
import { ExerciseDetailDialogComponent } from './components/exercise-detail-dialog/exercise-detail-dialog.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TrainerReviewDialogComponent } from './components/trainer-review-dialog/trainer-review-dialog.component';
import { TrainerReviewsListDialogComponent } from './components/trainer-reviews-list-dialog/trainer-reviews-list-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './services/interceptor/auth-interceptor.service';
import { AuthService } from './services/authentication/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { UserReviewComponent } from './components/user-review/user-review.component';
import { AllWebsiteReviewsComponent } from './components/all-website-reviews/all-website-reviews.component';
import { EditUserReviewsDialogComponent } from './components/edit-user-reviews-dialog/edit-user-reviews-dialog.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    CalculatorsComponent,
    AboutComponent,
    ReviewComponent,
    ExercisesComponent,
    TrainersComponent,
    MealsRecommandationComponent,
    ExercisesRecommandationComponent,
    ExerciseDetailDialogComponent,
    SafeUrlPipe,
    TrainerReviewDialogComponent,
    TrainerReviewsListDialogComponent,
    LoginComponent,
    RegisterComponent,
    UserReviewComponent,
    AllWebsiteReviewsComponent,
    EditUserReviewsDialogComponent,
    UserProfilComponent,
    PasswordResetComponent,
    PasswordChangeComponent,
    PasswordResetConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule,
    MatOptionModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatSnackBarModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    NgbModule,
    CarouselModule
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
