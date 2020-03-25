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
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
import { Chapitre } from '../models/chapitre.model';
@Injectable()
export class ChapitresService {
  @observable chapitres: Chapitre[] = [];
  // @observable themeFilter: string;
  chapitresSubject = new Subject<Chapitre[]>();
  constructor() {
    this.getChapitres();
  }
  getChapitres() {
    console.log('Get chapitres');
    firebase.database().ref('/chapitres')
      .on('value', (data: Datasnapshot) => {
        console.log('data', data);
        this.chapitres = data.val()
          ? Object.values(data.val()).map(chapitres => new Chapitre(chapitres))
          : [];
      });
  }
  saveChapitres() {
    this.chapitres.forEach(chapitre => {
      firebase.database().ref('/chapitres/' + chapitre.id).set(serialize(chapitre));
    });
  }
  getSingleChapitres(id: string) {
    if (this.chapitres) {
      return this.chapitres.find((chapitre) => {
        return chapitre.id === id;
      });
    }
  }
  createChapitres(newChapitres: Chapitre) {
    this.chapitres.push(newChapitres);
    const newChapitresId = firebase.database().ref('/chapitres/').push(newChapitres).key;
    newChapitres.id = newChapitresId;
    firebase.database().ref('/chapitres/' + newChapitresId).set(newChapitres);
    this.saveChapitres();
  }
  updateChapitres(chapitres: Chapitre) {
    console.log(serialize(chapitres));
    firebase.database().ref('/chapitres/' + chapitres.id).update(serialize(chapitres));
  }
  deleteChapitres(chapitres: Chapitre) {
    if (confirm('Supprimer la matière ?')) {
      if (chapitres.document) {
        const storageRef = firebase.storage().refFromURL(chapitres.document);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const chapitresIndexToRemove = this.chapitres.findIndex(
        (chapitresEl) => {
          if (chapitresEl === chapitres) {
            return true;
          }
        }
      );
      firebase.database().ref('/chapitres/' + chapitres.id).remove();
      this.chapitres.splice(chapitresIndexToRemove, 0);
      this.saveChapitres();
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
