import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }


  /* Ici on utilise onAuthStateChanged() qui est un observer de l'état d'authentification de l'utilisateur
  A chaque changement d'état ==> Méthode en argument exécutée
  Si authentification valide, onAuthStateChanged reçoit l'objet de type FB.User correspondant à l'utilisateur
  La variable isAuth prend donc la valeur de l'état de co(d'authentif) de l'utili et afficher les boutons qui correspondent à son état
  */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              // this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
