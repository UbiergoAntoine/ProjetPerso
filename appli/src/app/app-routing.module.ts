import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/signin', component: SigninComponent },
  { path: 'login/signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  // Redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
