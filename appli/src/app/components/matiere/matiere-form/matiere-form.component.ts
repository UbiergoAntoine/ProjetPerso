import { MatieresService } from './../../../services/matieres.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Matiere } from 'src/app/models/matiere.model';

@Component({
  selector: 'app-matiere-form',
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.scss']
})
export class MatiereFormComponent implements OnInit {

  // On importe matiere
  matiere: Matiere;
  matiereForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private matieresService: MatieresService,
    // private authorService: AuthorService,
    private router: Router,
    public dialogRef: MatDialogRef<MatiereFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.initForm();
  }

  // Gaffe à tes fonctions qui donnent des valeurs, et viennet écraser le code écrit juste avant
  initForm() {
    this.matiereForm = this.formBuilder.group({
      name: ''
    });
  }

  /* Crée des constantes à partir des valeurs rentrées dans le form
  Sur le click du onSave redirige vers matieres */

  onSaveMatiere() {
    const newMatiere = new Matiere({
      name: this.matiereForm.get('name').value
    });
    if (this.fileUrl && this.fileUrl !== '') {
      newMatiere.photo = this.fileUrl;
    }
    this.matieresService.createMatiere(newMatiere);
    // this.router.navigate(['/matieres']);
    this.dialogRef.close();
  }
  // Méthode qui déclenchera uploadFile() et qui récupèrera l'URl retourné :

  onUploadMatiereFile(file: File) {
    this.fileIsUploading = true;
    this.matieresService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  // Méthode qui lie <input type="File"> à la méthode onUploadFile()
  detectMatiereFiles(event) {
    this.onUploadMatiereFile(event.target.files[0]);
  }
  // Fermer le modal
  onClose(): void {
    this.dialogRef.close();
  }
}
