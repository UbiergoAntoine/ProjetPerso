import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string; // Envoyé par Fb
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) { }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({

      // Validator oblige un string au format email

      email: ['', [Validators.required, Validators.email]],

      // Validator oblige au moins 6caractères alphanumériques (minimum pour FB) avec une REGEX {6,}! J'ai trouvé plus simple

      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    // On envoie les valeurs rentrées par l'utili à la méthode sinInUser cette fois, pour log l'utili

    this.authService.signInUser(email, password).then(
      () => {

        // Si le log in du compte fonctionne, on le root vers /posts

        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error; // Sinon, message d'erreur envoyé par FB
      }
    );
  }
}
