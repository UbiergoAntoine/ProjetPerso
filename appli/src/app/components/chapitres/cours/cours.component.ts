import { computed } from 'mobx-angular';
import { Component, OnInit } from '@angular/core';
import { Cours } from './node_modules/src/app/models/cours.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoursService } from '../../../services/cours.service';
import { CoursFormComponent } from '../chapitres-form/cours-form.component';
export interface DialogData {
  cours: Cours;
}
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  cours: Cours;
  constructor(
    private coursService: CoursService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  @computed get coursComputed() {
    return this.coursService.cours;
  }
  addCours(cours: Cours): void {
    this.dialog.open(CoursFormComponent, {
      data: { cours }
    });
  }
  deleteCours(cours: Cours): void {
    this.coursService.deleteCours(cours);
  }
  viewCoursOfMatiere(id: string) {
    this.router.navigate(['/cours', 'view', id]);
  }

}
