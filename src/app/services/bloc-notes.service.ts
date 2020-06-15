import { Notes } from './../models/notes.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';

@Injectable({
  providedIn: 'root'
})
export class BlocNotesService {
  @observable notes: Notes[] = [];
  constructor() {
    this.getNotesList();
  }
  @computed get sortedNotes() {
    if (this.notes) {
      return Array.from(
        this.notes).slice().sort((a: Notes, b: Notes) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        });
    }
    return [];
  }
  createNewNotesList(newNotes) {
    const newNotesId = firebase.database().ref('/NotesList').push(newNotes).key;
    const newNoteOrder = firebase.database().ref('/NotesList').push(newNotes.order);
    newNotes.id = newNotesId;
    newNotes.order = newNoteOrder;
    firebase.database().ref('/NotesList/' + newNotesId).set(newNotes);
    this.notes.push(newNotes);
  }

  getNotesList() {
    firebase.database().ref('/NotesList')
      .on('value', (data: Datasnapshot) => {
        this.notes = data.val()
          ? Object.values(data.val()).map(note => new Notes(note))
          : [];
      });
  }
  updateNotesList(note: Notes) {
    firebase.database().ref('/NotesList/' + note.id).update(serialize(note));
  }
  removeNotesList(note: Notes) {
    const noteIndexToRemove = this.notes.indexOf(note);
    firebase.database().ref('/NotesList/' + note.id).remove().then(() => {
      this.notes.splice(noteIndexToRemove, 0);
    }, console.log);
  }
}
