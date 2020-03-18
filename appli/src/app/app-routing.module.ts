import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MatiereComponent } from './components/matiere/matiere/matiere.component';
import { MatiereFormComponent } from './components/matiere/matiere-form/matiere-form.component';
import { MatiereSingleComponent } from './components/matiere/matiere-single/matiere-single.component';

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuardService], component: LoginComponent },
  { path: 'login/signin', canActivate: [AuthGuardService], component: SigninComponent },
  { path: 'login/signup', canActivate: [AuthGuardService], component: SignupComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  // Matiere
  { path: 'matieres', canActivate: [AuthGuardService], component: MatiereComponent },
  { path: 'matieres/new', canActivate: [AuthGuardService], component: MatiereFormComponent },
  { path: 'matieres/view/:id', canActivate: [AuthGuardService], component: MatiereSingleComponent },
  { path: 'matieres/edit/:id', canActivate: [AuthGuardService], component: MatiereFormComponent },
  // // Posts
  // { path: 'posts', canActivate: [AuthGuardService], component: PostListComponent },
  // { path: 'posts/new', canActivate: [AuthGuardService], component: NewPostComponent },
  // { path: 'posts/view/:id', canActivate: [AuthGuardService], component: SinglePostComponent },
  // { path: 'posts/edit/:id', canActivate: [AuthGuardService], component: EditPostComponent },
  // // Posts
  // { path: 'posts', canActivate: [AuthGuardService], component: PostListComponent },
  // { path: 'posts/new', canActivate: [AuthGuardService], component: NewPostComponent },
  // { path: 'posts/view/:id', canActivate: [AuthGuardService], component: SinglePostComponent },
  // { path: 'posts/edit/:id', canActivate: [AuthGuardService], component: EditPostComponent },
  // Redirect
  { path: '', canActivate: [AuthGuardService], redirectTo: 'login', pathMatch: 'full' },
  { path: '**', canActivate: [AuthGuardService], redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
