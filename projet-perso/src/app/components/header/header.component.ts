import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { observable, computed } from 'mobx-angular';
import { Router } from '@angular/router';
import { autorun } from 'mobx';
import * as firebase from 'firebase';

// Pour la TODO List
import {
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selected = '';
  isAuth: boolean;
  @observable keyWordsPostValue: string;
  @observable titlePostValue: string;

  // Je crois qu'on peut virer le formbuilder
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }

  // Le computed pour les themes des posts
  // Sur le signout
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
  // signOut() {
  //   this.authService.signOutUser();
  // }
  // @computed get postsKeyWordsAutocomplete() {
  //   // toujours vérifier que le service est intialisé avant que la computed se mette en route
  //   if (this.postService.posts) {
  //     return this.postService.posts.filter(post => {
  //       if (this.postService.keyWordsFilter) {
  //         return post.getKeyWords.includes(this.postService.keyWordsFilter.toLowerCase());
  //       } else {
  //         return true;
  //       }
  //     });
  //   }
  // }
  // searchKeyWords(event) {
  //   this.postService.keyWordsFilter = event.target.value;
  // }
  // selectKeyWords(keyWord: string) {
  //   this.postService.keyWordsFilter = keyWord
  // }

  // le computed pour les titres des posts

  // @computed get postsTitleAutocomplete() {
  //   // toujours vérifier que le service est intialisé avant que la computed se mette en route
  //   if (this.postService.posts) {
  //     return this.postService.posts.filter(post => {
  //       if (this.titlePostValue) {
  //         return post.titre.toLowerCase().includes(this.titlePostValue.toLowerCase());
  //       } else {
  //         return true;
  //       }
  //     });
  //   }
  // }

  // searchTitle(event) {
  //   this.titlePostValue = event.target.value;
  // }

  // selectTitle(titre: string) {
  //   this.postService.titreFilter = titre;
  // }

  // onNewPost() {
  //   this.router.navigate(['posts', 'new'])
  // }
  // backOnMain() {
  //   this.router.navigate(["posts"])
  // }

  // // 3 fonctions qui ouvrent les 3 modals
  // openTodoListFromHeader(): void {
  //   this.dialog.open(TodoComponent);
  // }
  // openBlocNotesListFromHeader(): void {
  //   this.dialog.open(BlocNotesComponent);
  // }

  // openNewPostComponentFromHeader(): void {
  //   this.dialog.open(PostNewComponent);
  // }

  // // Pour clear la value des input sur le click de la croix
  // resetFilter() {
  //   this.postService.keyWordsFilter = '';
  // }

  // resetTitleFilter() {
  //   this.postService.titreFilter = '';
  // }

}
