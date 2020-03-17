import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  // On commence par la route du SignIn
  { path: 'auth/signin', component: SigninComponent },
  // Si SignIn Successful il route vers Home
  { path: 'posts', component: HomeComponent },
  // { path: 'posts/edit/:id', component: PostEditComponent },
  // { path: 'posts/view/:id', component: PostSingleComponent },

  // Undefiened (on peut faire avec _redirects )
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
