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
    })
  }
  fetchPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: Datasnapshot) => {
        this.posts = data.val()
          ? Object.values(data.val()).map(post => new Post(post))
          : [];
        console.log("Finished fetching posts...")
      });
  }

  @computed get getSortedPosts(): Post[] {
    return this.posts.slice().sort((a, b) => {
      return a.date > b.date ? 1 : -1
    })
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
        return post.keyWords.some(keyword => keyword.name.toLowerCase() === this.keyWordsFilter.toLowerCase())
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
    newPost.id = newPostId;  // Marco a set un nouvel id unique pour les posts facilitant les manipulations
    firebase.database().ref('/posts/' + newPostId).set(newPost);
  }

  updatePost(post: Post) {
    // console.log('post', post);
    // const { comments, author, ..._post } = post; ---> Pas besoin car on lit que les valeurs serializable
    // console.log(serialize(post));
    firebase.database().ref('/posts/' + post.id).update(serialize(post));
  }
  removePost(post: Post) {

    if (confirm('Supprimer le post ?')) {

      // Si on supprime le post, il faut que la photo soit supprimée aussi
      if (post.photo) {
        const storageRef = firebase.storage().refFromURL(post.photo);
        // On passe l'URl du fichier à refFromURL pour en récupérer la réf
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
      // Une fois supprimé, (splice) savePost()
      firebase.database().ref('/posts/' + post.id).remove();
      this.posts.splice(postIndexToRemove, 1);

    } else {  // On alert que le livre n'est pas supprimé
      alert('Le post n\'a pas été supprimé en vous allez y être redirigé')
    }
  }
  uploadFile(file: File) { // prend comme argument le fichier de type file
    return new Promise( // La promesse asynchrone(resolve/reject) car l'upload prends du temps
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString(); // nom unique pour éviter d'écraser (string date.now)
        const upload = firebase.storage().ref() // tache de chargement upload ==> retourne une ref à FB
          .child('images/' + almostUniqueFileName + file.name).put(file);
        /* child retourne une ref au sous-dossier image + ref avec identifiant
  unique date.now + nom original du fichier avec format d'origine */

        /* .on() en suit l'état ==> 3 f°
        1=>déclenchée dès que données=> server
        2=> si server renvoie une erreur
        3=>chargement terminé et retourne url unique du serv */
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
