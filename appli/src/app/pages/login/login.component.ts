import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuth: boolean;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          console.log('this.isAuth', this.isAuth);
        } else {
          this.isAuth = false;
          console.log('this.isAuth', this.isAuth);
        }
      }
    );
  }
  signOut() {
    this.authService.signOutUser();
  }

}
