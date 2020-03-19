import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { Subject } from 'rxjs';
import { Matiere } from '../models/matiere.model';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';
@Injectable()
export class MatieresService {
  @observable matieres: Matiere[] = [];
  // @observable themeFilter: string;
  matieresSubject = new Subject<Matiere[]>();
  constructor() {
    this.getMatieres();
  }
  getMatieres() {
    console.log('Get matieres');
    firebase.database().ref('/matieres')
      .on('value', (data: Datasnapshot) => {
        console.log('data', data);
        this.matieres = data.val()
          ? Object.values(data.val()).map(matiere => new Matiere(matiere))
          : [];
      });
  }
  saveMatieres() {
    this.matieres.forEach(matiere => {
      firebase.database().ref('/matieres/' + matiere.id).set(serialize(matiere));
    });
  }
  getSingleMatiere(id: string) {
    if (this.matieres) {
      return this.matieres.find((matiere) => {
        return matiere.id === id;
      });
    }
  }
  createMatiere(newMatiere: Matiere) {
    this.matieres.push(newMatiere);
    const newMatiereId = firebase.database().ref('/matieres').push(newMatiere).key;
    newMatiere.id = newMatiereId;
    firebase.database().ref('/matieres/' + newMatiereId).set(newMatiere);
    this.saveMatieres();
  }
  updateMatiere(matiere: Matiere) {
    console.log(serialize(matiere));
    firebase.database().ref('/matieres/' + matiere.id).update(serialize(matiere));
  }
  deleteMatiere(matiere: Matiere) {
    if (confirm('Supprimer la matière ?')) {
      if (matiere.photo) {
        const storageRef = firebase.storage().refFromURL(matiere.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const matiereIndexToRemove = this.matieres.findIndex(
        (matiereEl) => {
          if (matiereEl === matiere) {
            return true;
          }
        }
      );
      firebase.database().ref('/matieres/' + matiere.id).remove();
      this.matieres.splice(matiereIndexToRemove, 0);
      this.saveMatieres();
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
