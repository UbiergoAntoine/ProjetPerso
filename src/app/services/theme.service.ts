import { Theme } from './../models/theme.model';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';

@Injectable()
export class ThemeService {

  // posts : themeList
  // post : theme
  // Post : ThemeList
  @observable themeList: Theme[] = [];

  // Pour la THEMELIST il nous faut 2 computed avec 2 filter
  // 1 qui observe l'état des theme et les chargent, un autre qui observe les done
  constructor() {
    this.getThemeList();
  }
  createNewThemeList(newThemeList) {
    this.themeList.push(newThemeList);
    const newThemeListId = firebase.database().ref('/ThemeList').push(newThemeList).key;
    newThemeList.id = newThemeListId;
    firebase.database().ref('/ThemeList/' + newThemeListId).set(newThemeList);
  }

  getThemeList() {
    firebase.database().ref('/ThemeList')
      .on('value', (data: Datasnapshot) => {
        this.themeList = data.val()
          ? Object.values(data.val()).map(theme => new Theme(theme))
          : [];
      });
  }
  updateThemeList(theme: Theme) {
    firebase.database().ref('/ThemeList/' + theme.id).update(serialize(theme));
  }
  removeThemeList(theme: Theme) {
    const themeIndexToRemove = this.themeList.findIndex(
      (themeEl) => {
        if (themeEl === theme) {
          return true;
        }
      }
    );
    firebase.database().ref('/ThemeList/' + theme.id).remove();
    this.themeList.splice(themeIndexToRemove, 1);
  }
}
