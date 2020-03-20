import { CoursService } from '../../../services/cours.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cours } from 'src/app/models/cours.model';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.scss']
})
export class CoursFormComponent implements OnInit {

  // On importe cours
  cours: Cours;
  coursForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private coursService: CoursService,
    // private authorService: AuthorService,
    private router: Router,
    public dialogRef: MatDialogRef<CoursFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.initForm();
  }

  // Gaffe à tes fonctions qui donnent des valeurs, et viennet écraser le code écrit juste avant
  initForm() {
    this.coursForm = this.formBuilder.group({
      name: ''
    });
  }

  /* Crée des constantes à partir des valeurs rentrées dans le form
  Sur le click du onSave redirige vers courss */

  onSaveCours() {
    const newCours = new Cours({
      name: this.coursForm.get('name').value
    });
    if (this.fileUrl && this.fileUrl !== '') {
      newCours.photo = this.fileUrl;
    }
    this.coursService.createCours(newCours);
    // this.router.navigate(['/courss']);
    this.dialogRef.close();
  }
  // Méthode qui déclenchera uploadFile() et qui récupèrera l'URl retourné :

  onUploadCoursFile(file: File) {
    this.fileIsUploading = true;
    this.coursService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  // Méthode qui lie <input type="File"> à la méthode onUploadFile()
  detectCoursFiles(event) {
    this.onUploadCoursFile(event.target.files[0]);
  }
  // Fermer le modal
  onClose(): void {
    this.dialogRef.close();
  }
}
