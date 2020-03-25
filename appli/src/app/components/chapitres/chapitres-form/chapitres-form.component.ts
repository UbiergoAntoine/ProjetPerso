import { ChapitresService } from '../../../services/chapitres.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapitre } from 'src/app/models/chapitre.model';

@Component({
  selector: 'app-chapitres-form',
  templateUrl: './chapitres-form.component.html',
  styleUrls: ['./chapitres-form.component.scss']
})
export class ChapitresFormComponent implements OnInit {

  // On importe chapitres
  chapitre: Chapitre;
  chapitresForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private chapitresService: ChapitresService,
    // private authorService: AuthorService,
    private router: Router,
    public dialogRef: MatDialogRef<ChapitresFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.initForm();
  }

  // Gaffe à tes fonctions qui donnent des valeurs, et viennet écraser le code écrit juste avant
  initForm() {
    this.chapitresForm = this.formBuilder.group({
      name: ''
    });
  }

  /* Crée des constantes à partir des valeurs rentrées dans le form
  Sur le click du onSave redirige vers chapitress */

  onSaveChapitres() {
    const newChapitre = new Chapitre({
      name: this.chapitresForm.get('name').value
    });
    // if (this.fileUrl && this.fileUrl !== '') {
    //   newChapitre.photo = this.fileUrl;
    // }
    this.chapitresService.createChapitres(newChapitre);
    // this.router.navigate(['/chapitress']);
    this.dialogRef.close();
  }
  // Méthode qui déclenchera uploadFile() et qui récupèrera l'URl retourné :

  onUploadChapitresFile(file: File) {
    this.fileIsUploading = true;
    this.chapitresService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  // Méthode qui lie <input type="File"> à la méthode onUploadFile()
  detectChapitresFiles(event) {
    this.onUploadChapitresFile(event.target.files[0]);
  }
  // Fermer le modal
  onClose(): void {
    this.dialogRef.close();
  }
}
