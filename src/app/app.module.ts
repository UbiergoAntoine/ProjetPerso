

// Les modules
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MobxAngularModule } from 'mobx-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { MatListModule } from '@angular/material/list';

// Les compos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { PostNewComponent } from './modals/post-new/post-new.component';
import { PostSingleComponent } from './pages/post-single/post-single.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemePageComponent } from './pages/theme-page/theme-page.component';
import { FiltersComponent } from './components/posts/filters/filters.component';
import { PostFormComponent } from './components/posts/post-form/post-form.component';
import { PostResumeComponent } from './components/posts/post-resume/post-resume.component';
import { BandeauComponent } from './components/posts/bandeau/bandeau.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BlocNotesComponent } from './modals/bloc-notes/bloc-notes.component';
import { TodoComponent } from './modals/todo/todo.component';

// FB
import * as firebase from 'firebase';

// Les services

import { ThemeService } from './services/theme.service';
import { BlocNotesService } from './services/bloc-notes.service';
import { TodoService } from './services/todo.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostEditComponent,
    PostSingleComponent,
    PostNewComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    TodoComponent,
    BlocNotesComponent,
    HomeComponent,
    FooterComponent,
    PostCardComponent,
    BandeauComponent,
    PostResumeComponent,
    PostFormComponent,
    FiltersComponent,
    ThemePageComponent,
    ThemeComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MobxAngularModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MarkdownModule.forRoot(),
  ],

  providers: [
    PostService,
    AuthGuardService,
    AuthService,
    TodoService,
    BlocNotesService,
    ThemeService
  ],

  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    BlocNotesComponent,
    TodoComponent,
    PostNewComponent
  ]
})
export class AppModule {
  constructor() {

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBiVCMTCZsuZP00q3rE6wgFS351-cxC9iM',
      authDomain: 'site-perso-85dde.firebaseapp.com',
      databaseURL: 'https://site-perso-85dde.firebaseio.com',
      projectId: 'site-perso-85dde',
      storageBucket: 'site-perso-85dde.appspot.com',
      messagingSenderId: '3032690032',
      appId: '1:3032690032:web:a629f27ab4125f3b'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
}
