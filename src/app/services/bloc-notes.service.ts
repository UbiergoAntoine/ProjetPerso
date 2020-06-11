import { Notes } from './../models/notes.model';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';

@Injectable({
  providedIn: 'root'
})
export class BlocNotesService {
  // posts : notes
  // post : note
  // Post : Notes
  @observable notes: Notes[] = [];
  constructor() {
    this.getNotesList();
  }
  createNewNotesList(newNotes) {
    this.notes.push(newNotes);
    const newNotesId = firebase.database().ref('/NotesList').push(newNotes).key;
    newNotes.id = newNotesId;
    firebase.database().ref('/NotesList/' + newNotesId).set(newNotes);
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
