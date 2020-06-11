
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { computed } from 'mobx-angular';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemePageComponent } from 'src/app/pages/theme-page/theme-page.component';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  theme = '';
  // ThemeFormListForm: FormGroup;
  constructor(
    public themeService: ThemeService,
    // private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ThemePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  // @computed get themeformListComputed() {
  //   if (this.themeformService.themeformList) {
  //     return this.themeformService.themeformList.filter(stillthemeform => {
  //       return !stillthemeform.done;
  //     });
  //   }
  // }
  // @computed get doneListComputed() {
  //   if (this.themeformService.themeformList) {
  //     return this.themeformService.themeformList.filter(donechecked => {
  //       return donechecked.done;
  //     });
  //   }
  // }
  ngOnInit() {
    // this.initForm();
  }
  // initForm() {
  //   this.ThemeFormListForm = this.formBuilder.group({
  //     themeform: ['', Validators.required],
  //     done: false,
  //   });
  // }
  // onSaveThemeFormList() {
  //   const newThemeFormList = new ThemeForm({
  //     themeform: this.ThemeFormListForm.get('themeform').value,
  //     done: this.ThemeFormListForm.get('done').value
  //   });
  //   this.themeformService.createNewThemeFormList(newThemeFormList);
  //   this.ThemeFormListForm.reset();
  // }
  // onEnter(themeform: string) {
  //   this.themeform = themeform;
  //   this.onSaveThemeFormList();
  //   this.ThemeFormListForm.reset();
  // }
  // onDeleteThemeFormItem(themeform: ThemeForm) {
  //   this.themeformService.removeThemeFormList(themeform);
  // }

}
