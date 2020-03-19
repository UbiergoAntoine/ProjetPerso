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
