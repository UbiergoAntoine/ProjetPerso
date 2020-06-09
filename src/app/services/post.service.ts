import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
import { autorun } from 'mobx';
@Injectable()
export class PostService {
  @observable posts: Post[] = [];
  @observable themeFilter: string;
  @observable keyWordsFilter: string;
  @observable titreFilter: string;
  themes = [{
    name: 'Front-End',
    icon: 'keyboard'
  },
  {
    name: 'Back-End',
    icon: 'backup'
  },
  {
    name: 'Design',
    icon: 'developer_board'
  },
  {
    name: 'Logiciels',
    icon: 'build'
  },
  {
    name: 'Théorie',
    icon: 'dashboard'
  }];

  constructor() {
    this.fetchPosts();
    autorun(() => {
      console.log(this.themeFilter);
    });
  }
  fetchPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: Datasnapshot) => {
        this.posts = data.val()
          ? Object.values(data.val()).map(post => new Post(post))
          : [];
      });
  }

  @computed get getSortedPosts(): Post[] {
    return this.posts.slice().sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    });
  }
  @computed get getFilteredPosts(): Post[] {
    return this.getSortedPosts.filter(post => {
      if (this.themeFilter) {
        return post.theme === this.themeFilter;
      } else {
        return true;
      }
    }).filter(post => {
      if (this.titreFilter) {
        return this.titreFilter.toLowerCase().split(' ').every(word => post.titre.toLowerCase().includes(word));
      } else {
        return true;
      }
    }).filter(post => {
      if (this.keyWordsFilter) {
        return post.keyWords.some(keyword => keyword.name.toLowerCase() === this.keyWordsFilter.toLowerCase());
      } else {
        return true;
      }
    });
  }

  getSinglePost(id: string) {
    if (this.posts) {
      return this.posts.find((post) => {
        return post.id === id;
      });
    }
  }
  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    const newPostId = firebase.database().ref('/posts').push(newPost).key;
    newPost.id = newPostId;
    firebase.database().ref('/posts/' + newPostId).set(newPost);
  }

  updatePost(post: Post) {
    firebase.database().ref('/posts/' + post.id).update(serialize(post));
  }
  removePost(post: Post) {

    if (confirm('Supprimer le post ?')) {
      if (post.photo) {
        const storageRef = firebase.storage().refFromURL(post.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const postIndexToRemove = this.posts.findIndex(
        (postEl) => {
          if (postEl === post) {
            return true;
          }
        }
      );
      firebase.database().ref('/posts/' + post.id).remove();
      this.posts.splice(postIndexToRemove, 1);

    } else {
      alert('Le post n\'a pas été supprimé en vous allez y être redirigé');
    }
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
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
