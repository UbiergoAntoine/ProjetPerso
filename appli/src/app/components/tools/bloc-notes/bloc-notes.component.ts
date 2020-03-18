import { AppComponent } from './../../../app.component';
import { Notes } from './../../../models/notes.model';
import { BlocNotesService } from './../../../services/bloc-notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { observable } from 'mobx-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bloc-notes',
  templateUrl: './bloc-notes.component.html',
  styleUrls: ['./bloc-notes.component.scss']
})
export class BlocNotesComponent implements OnInit {
  note = '';
  notesListForm: FormGroup;
  @observable date: Date;
  @observable noteId: string;
  constructor(
    public blocnotesService: BlocNotesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.noteId = params.id;
    });
  }
  initForm() {
    this.notesListForm = this.formBuilder.group({
      note: ['', Validators.required]
    });
  }
  onSaveNotesList() {
    const newNotes = new Notes({
      note: this.notesListForm.get('note').value,

      date: Date.now()
    });
    this.blocnotesService.createNewNotesList(newNotes);
    this.notesListForm.reset();
  }
  onEnter(note: string) {
    this.note = note;
    this.onSaveNotesList();
    this.notesListForm.reset();
  }
  onDeleteNote(event, note: Notes) {
    event.stopPropagation();
    this.blocnotesService.removeNotesList(note);
  }
}
