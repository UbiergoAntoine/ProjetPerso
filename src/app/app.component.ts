import { AuthService } from './services/auth.service';
import { PostNewComponent } from './Posts/post-new/post-new.component';
import { BlocNotesService } from './services/bloc-notes.service';
import { BlocNotesComponent } from './bloc-notes/bloc-notes.component';
import { PostService } from './services/post.service';
import {
  Component, OnInit
} from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';




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
