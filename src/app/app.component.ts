import { Observable } from 'rxjs';
import { TodoComponent } from './modals/todo/todo.component';
import { BlocNotesComponent } from './modals/bloc-notes/bloc-notes.component';
import { PostNewComponent } from './modals/post-new/post-new.component';
import { AuthService } from './services/auth.service';
import { BlocNotesService } from './services/bloc-notes.service';
import { PostService } from './services/post.service';
import {
  Component, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { AuthGuardService } from './services/auth-guard.service';
import { computed, observable } from 'mobx-angular';
import { DarkModeService } from './services/dark-mode.service';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'POUJADE Valentin & UBIERGO Antoine';
  @observable isAuth: boolean;
  isThemeDark: Observable<boolean>;
  constructor(
    public overlayContainer: OverlayContainer,
    private authGuardService: AuthGuardService,
    public postService: PostService,
    public blocnotesService: BlocNotesService,
    private authService: AuthService,
    public dialog: MatDialog,
    public darkModeService: DarkModeService) {
    overlayContainer.getContainerElement().classList.add('dark-mode');
    // overlayContainer.getContainerElement().classList.add('dark-mode');
  }

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

  // La computed qui renvoie si le user est connecté ou pas
  // (oublie pas d'importer @computed CTRL espace ==> icône cube violet)
  // Dans le HTML où tu veux contrôler que ce soit visible que quand on est log :
  //  *ngIf="signedMode"
  @computed get signedMode(): boolean {
    return this.authGuardService.isSigned;
  }

  // DarkMode
  toggleDarkTheme(setDarkMode) {
    this.darkModeService.setDarkTheme(setDarkMode.checked);
  }
}
