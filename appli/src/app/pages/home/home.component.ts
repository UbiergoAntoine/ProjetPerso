import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { computed, observable } from 'mobx-angular';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selected = '';
  isAuth: boolean;
  @observable keyWordsPostValue: string;
  @observable titlePostValue: string;
  constructor(
    private authService: AuthService,
    private router: Router) { }

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
  backOnMain() {
    this.router.navigate(['home']);
  }
}
