import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

import { PostSingleComponent } from './Posts/post-single/post-single.component';
import { PostEditComponent } from './Posts/post-edit/post-edit.component';
import { PostNewComponent } from './Posts/post-new/post-new.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ThemePageComponent } from './theme-page/theme-page.component';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/edit/:id', component: PostEditComponent },
  { path: 'posts/view/:id', component: PostSingleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'themes', component: ThemePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
