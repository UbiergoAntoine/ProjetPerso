// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// PAGES
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import * as firebase from 'firebase';
// COMPONENTS
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoComponent } from './components/tools/todo/todo.component';
import { BlocNotesComponent } from './components/tools/bloc-notes/bloc-notes.component';
// SERVICES
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';
import { BlocNotesService } from './services/bloc-notes.service';
import { MatiereComponent } from './components/matiere/matiere/matiere.component';
import { MatiereFormComponent } from './components/matiere/matiere-form/matiere-form.component';
import { MatiereSingleComponent } from './components/matiere/matiere-single/matiere-single.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // PAGES
    HomeComponent,
    FooterComponent,
    // COMPONENTS
    SigninComponent,
    SignupComponent,
    TodoComponent,
    BlocNotesComponent,
    MatiereComponent,
    MatiereFormComponent,
    MatiereSingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TodoService,
    BlocNotesService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    BlocNotesComponent,
    TodoComponent
  ]
})
export class AppModule {

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBjvM0N9c8T-VuTCG3pGtsBrXT5GvpKywE',
      authDomain: 'ressources-developpement.firebaseapp.com',
      databaseURL: 'https://ressources-developpement.firebaseio.com',
      projectId: 'ressources-developpement',
      storageBucket: 'ressources-developpement.appspot.com',
      messagingSenderId: '368558450071',
      appId: '1:368558450071:web:1cbb836bd67b1ea2e750d2',
      measurementId: 'G-QZ1Z340VGP'
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
