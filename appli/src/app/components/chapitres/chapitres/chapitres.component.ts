import { computed } from 'mobx-angular';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChapitresService } from '../../../services/chapitres.service';
import { ChapitresFormComponent } from '../chapitres-form/chapitres-form.component';
import { Chapitre } from 'src/app/models/chapitre.model';
export interface DialogData {
  chapitres: Chapitre;
}
@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.scss']
})
export class ChapitresComponent implements OnInit {
  chapitres: Chapitre;
  constructor(
    private chapitresService: ChapitresService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  @computed get chapitresComputed() {
    return this.chapitresService.chapitres;
  }
  addChapitres(chapitres: Chapitre): void {
    this.dialog.open(ChapitresFormComponent, {
      data: { chapitres }
    });
  }
  deleteChapitres(chapitres: Chapitre): void {
    this.chapitresService.deleteChapitres(chapitres);
  }
  viewChapitresDetail(id: string) {
    this.router.navigate(["/chapitre", id]);
  }

}
