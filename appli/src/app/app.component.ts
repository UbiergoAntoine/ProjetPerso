
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { TodoComponent } from './components/tools/todo/todo.component';
import { BlocNotesComponent } from './components/tools/bloc-notes/bloc-notes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'appli';
  isAuth: boolean;
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  private MobileQueryListener: () => void;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.MobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.MobileQueryListener);
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.MobileQueryListener);
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
}
