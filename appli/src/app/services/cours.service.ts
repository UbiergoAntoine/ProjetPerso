/* import { BooksService } from './books.service';
import { PostService } from './post.service';
import { Comment } from './../models/comment.model';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
// On a besoin de Fb et DataSnapShot
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
import { Post } from '../models/post.model';

@Injectable()  //// Il s'est perdu lui ?
export class CommentsService {

  @observable comments: Comment[] = [];
  @observable date: Date[] = [];
  constructor(
    private postService: PostService,
    private bookService: BooksService) {
    this.getComments();
  }

  getSingleComment(id: string) {
    if (this.comments) {
      return this.comments.find((comment) => {
        return comment.id === id;
      });
    }
  }

  // On crée la fonction pour update les comments uniquement
  updateComment(comment: Comment) {
    firebase.database().ref('/comments/' + comment.id).update(comment);
  }

  // Utile d'afficher les comments à partir du service ?
  // J'ai du code à déplacer je crois ?
  getComments() {
    firebase.database().ref('/comments')
      .on('value', (data: Datasnapshot) => {
        console.log('data', data);
        this.comments = data.val()
          ? Object.values(data.val()).map(comment => new Comment(comment))
          : [];
        console.log(this.comments);
      });
  }

  // Fonction pour créer un nouveau commentaire
  // On a du lui passser directement les arguments
  createNewComment(newComment: Comment, postOuBook) {
    const newCommentId = firebase.database().ref('/comments').push(serialize(newComment)).key;
    newComment.id = newCommentId;
    this.comments.push(newComment);
    firebase.database().ref('/comments/' + newCommentId).set({
      id: newComment.id,
      comment: newComment.comment,
      date: newComment.date
    });
    postOuBook.commentId.push(newCommentId);  // C'est bien post.commentId pourtant ..
    if (postOuBook instanceof Post) {
      this.postService.updatePost(postOuBook);
    } else {
      this.bookService.updateBook(postOuBook);
    }
  }
}

*/
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { Subject } from 'rxjs';
import { Cours } from '../models/cours.model';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
@Injectable()
export class CoursService {
  @observable cours: Cours[] = [];
  // @observable themeFilter: string;
  coursSubject = new Subject<Cours[]>();
  constructor() {
    this.getCours();
  }
  getCours() {
    console.log('Get cours');
    firebase.database().ref('/cours')
      .on('value', (data: Datasnapshot) => {
        console.log('data', data);
        this.cours = data.val()
          ? Object.values(data.val()).map(cours => new Cours(cours))
          : [];
      });
  }
  saveCours() {
    this.cours.forEach(cour => {
      firebase.database().ref('/cours/' + cour.id).set(serialize(cour));
    });
  }
  getSingleCours(id: string) {
    if (this.cours) {
      return this.cours.find((cour) => {
        return cour.id === id;
      });
    }
  }
  createCours(newCours: Cours) {
    this.cours.push(newCours);
    const newCoursId = firebase.database().ref('/cours/').push(newCours).key;
    newCours.id = newCoursId;
    firebase.database().ref('/cours/' + newCoursId).set(newCours);
    this.saveCours();
  }
  updateCours(cours: Cours) {
    console.log(serialize(cours));
    firebase.database().ref('/cours/' + cours.id).update(serialize(cours));
  }
  deleteCours(cours: Cours) {
    if (confirm('Supprimer la matière ?')) {
      if (cours.photo) {
        const storageRef = firebase.storage().refFromURL(cours.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const coursIndexToRemove = this.cours.findIndex(
        (coursEl) => {
          if (coursEl === cours) {
            return true;
          }
        }
      );
      firebase.database().ref('/cours/' + cours.id).remove();
      this.cours.splice(coursIndexToRemove, 0);
      this.saveCours();
    } else {
      alert('La matière n\'a pas été supprimé');
    }
  }
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.catch(err => console.warn(err));
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ', error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
    );
  }
}
