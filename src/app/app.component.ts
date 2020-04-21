import { AuthService } from './services/auth.service';
import { Post } from './models/post.model';
import { PostNewComponent } from './Posts/post-new/post-new.component';
import { BlocNotesService } from './services/bloc-notes.service';
import { BlocNotesComponent } from './bloc-notes/bloc-notes.component';
import { PostService } from './services/post.service';
import {
  Component, OnInit, Inject,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TodoComponent } from './todo/todo.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from './models/todo.model';
import { Notes } from './models/notes.model';
import * as firebase from 'firebase';
import { observable, computed } from 'mobx-angular';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'POUJADE Valentin & UBIERGO Antoine';
  isAuth: boolean;

  constructor(
    public postService: PostService,
    public blocnotesService: BlocNotesService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  signOut() {
    this.authService.signOutUser();
  }

  // Pour ouvrir les 3 modals
  openTodoList(): void {
    this.dialog.open(TodoComponent);
  }
  openBlocNotesList(): void {
    this.dialog.open(BlocNotesComponent);
  }

  openNewPostComponent(): void {
    this.dialog.open(PostNewComponent);
  }



}
