import { computed } from 'mobx-angular';
import { Component, OnInit } from '@angular/core';
import { Matiere } from 'src/app/models/matiere.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatieresService } from 'src/app/services/matieres.service';
import { MatiereFormComponent } from '../matiere-form/matiere-form.component';
export interface DialogData {
  matiere: Matiere;
}
@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss']
})
export class MatiereComponent implements OnInit {
  matiere: Matiere;
  constructor(
    private matieresService: MatieresService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  @computed get matieresComputed() {
    return this.matieresService.matieres;
  }
  addMatiere(matiere: Matiere): void {
    this.dialog.open(MatiereFormComponent, {
      data: { matiere }
    });
  }
  deleteMatiere(matiere: Matiere): void {
    this.matieresService.deleteMatiere(matiere);
  }
  viewCoursOfMatiere(id: string) {
    this.router.navigate(['/matieres', 'view', id]);
  }
  onDeletePost(matiere: Matiere) {
    this.matieresService.deleteMatiere(matiere);
  }

}
