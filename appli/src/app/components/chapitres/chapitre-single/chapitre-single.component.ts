import { computed } from 'mobx-angular';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chapitre } from 'src/app/models/chapitre.model';
import { ChapitresService } from 'src/app/services/chapitres.service';

@Component({
  selector: 'app-chapitre-single',
  templateUrl: './chapitre-single.component.html',
  styleUrls: ['./chapitre-single.component.scss']
})
export class ChapitreSingleComponent implements OnInit {
  chapitreSingle: Chapitre;
  chapitreForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private chapitresService: ChapitresService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

   // Gaffe à tes fonctions qui donnent des valeurs, et viennet écraser le code écrit juste avant
   initForm() {
    this.chapitreForm = this.formBuilder.group({
      name: ''
    });
  }

  viewChapitreSingleDetail(id: string) {
    this.router.navigate([this.router.url,"/chapitre/", id]);
  }

  onSaveChapitre() {
    const newChapitre = new Chapitre({
      name: this.chapitreForm.get('name').value
    });
    // if (this.fileUrl && this.fileUrl !== '') {
    //   newChapitre.photo = this.fileUrl;
    // }
    this.chapitresService.updateChapitres(newChapitre);
    // this.router.navigate(['/chapitres']);
  }

}
