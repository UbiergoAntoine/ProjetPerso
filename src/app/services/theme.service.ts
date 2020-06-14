import { Theme } from './../models/theme.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
import { autorun } from 'mobx';
@Injectable()
export class ThemeService {
  @observable themes: Theme[] = [];
  @observable themeFilter: string;
  @observable keyWordsFilter: string;
  @observable titreFilter: string;
  // @observable themes = [{
  //   name: 'Front-End',
  //   icon: 'keyboard'
  // },
  // {
  //   name: 'Back-End',
  //   icon: 'backup'
  // },
  // {
  //   name: 'Design',
  //   icon: 'developer_board'
  // },
  // {
  //   name: 'Logiciels',
  //   icon: 'build'
  // },
  // {
  //   name: 'Théorie',
  //   icon: 'dashboard'
  // }];

  constructor() {
    this.fetchThemes();
    autorun(() => {
      console.log(this.themeFilter);
    });
  }
  fetchThemes() {
    firebase.database().ref('/themes')
      .on('value', (data: Datasnapshot) => {
        this.themes = data.val()
          ? Object.values(data.val()).map(theme => new Theme(theme))
          : [];
      });
  }
  @computed get getAllThemes(): Theme[] {
    return this.themes;
  }
  // @computed get getFilteredThemes(): Theme[] {
  //   return this.getSortedThemes.filter(theme => {
  //     if (this.themeFilter) {
  //       return theme.theme === this.themeFilter;
  //     } else {
  //       return true;
  //     }
  //   }).filter(theme => {
  //     if (this.titreFilter) {
  //       return this.titreFilter.toLowerCase().split(' ').every(word => theme.titre.toLowerCase().includes(word));
  //     } else {
  //       return true;
  //     }
  //   }).filter(theme => {
  //     if (this.keyWordsFilter) {
  //       return theme.keyWords.some(keyword => keyword.name.toLowerCase() === this.keyWordsFilter.toLowerCase());
  //     } else {
  //       return true;
  //     }
  //   });
  // }

  // getSingleTheme(id: string) {
  //   if (this.themes) {
  //     return this.themes.find((theme) => {
  //       return theme.id === id;
  //     });
  //   }
  // }
  createNewTheme(newTheme: Theme) {
    this.themes.push(newTheme);
    const newThemeId = firebase.database().ref('/themes').push(newTheme).key;
    newTheme.id = newThemeId;
    firebase.database().ref('/themes/' + newThemeId).set(newTheme);
  }

  updateTheme(theme: Theme) {
    firebase.database().ref('/themes/' + theme.id).update(serialize(theme));
  }
  removeTheme(theme: Theme) {
    if (confirm('Supprimer le theme ?')) {
      const themeIndexToRemove = this.themes.findIndex(
        (themeId) => {
          if (themeId === theme) {
            return true;
          }
        }
      );
      firebase.database().ref('/themes/' + theme.id).remove();
      this.themes.splice(themeIndexToRemove, 1);
    } else {
      alert('Le theme n\'a pas été supprimé en vous allez y être redirigé');
    }
  }
  // uploadFile(file: File) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       const almostUniqueFileName = Date.now().toString();
  //       const upload = firebase.storage().ref()
  //         .child('images/' + almostUniqueFileName + file.name).put(file);
  //       upload.catch(err => console.warn(err));
  //       upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //         () => {
  //           console.log('Chargement…');
  //         },
  //         (error) => {
  //           console.log('Erreur de chargement ! : ', error);
  //           reject();
  //         },
  //         () => {
  //           resolve(upload.snapshot.ref.getDownloadURL());
  //         }
  //       );
  //     }
  //   );
  // }
}
