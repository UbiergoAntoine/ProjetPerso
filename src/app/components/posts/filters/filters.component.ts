import { BlocNotesService } from './../../../services/bloc-notes.service';
import { Post } from './../../../models/post.model';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { computed, observable } from 'mobx-angular';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() theme: Theme;

  @Input() post: Post;

  // @Input
  @observable selected = '';
  @observable keyWordsPostValue: string;
  @observable titlePostValue: string;
  constructor(
    // private cdRef: ChangeDetectorRef,
    private themeService: ThemeService,
    public postService: PostService,
    public blocnotesService: BlocNotesService) { }

  // ngAfterViewChecked() {
  //   console.log("! changement de la date du composant !");
  //   if (this.postService.themeFilter) {
  //     this.postService.themeFilter = this.selected;
  //   }
  // }

  ngOnInit() {
    console.log('this.postService.themeFilter', this.postService.themeFilter);
    //     if (this.postService.themeFilter) {
    //       this.postService.themeFilter = this.selected;
    //     }

    //     selectElement('leaveCode', '11')

    // function selectElement(id, valueToSelect) {
    //     let element = document.getElementById(id);
    //     element.value = valueToSelect;
    // }
  }

  @computed get themeFilter() {
    return this.postService.themeFilter;
  }
  @computed get allKeyWords() {
    if (this.postService.posts) {
      return this.postService.posts.reduce((acc, post) => {
        return acc.concat(
          post.keyWords.filter(k => {
            return acc.every(key => key.name.toLowerCase() !== k.name.toLowerCase());
          })
        );
      }, []);
    }
  }

  searchKeyWords(event) {
    this.postService.keyWordsFilter = event.target.value;
  }
  selectKeyWords(keyWord: string) {
    this.postService.keyWordsFilter = keyWord;
  }
  @computed get postsTitleAutocomplete() {
    if (this.postService.posts) {
      return this.postService.posts.filter(post => {
        if (this.titlePostValue) {
          return post.titre.toLowerCase().includes(this.titlePostValue.toLowerCase());
        } else {
          return true;
        }
      });
    }
  }
  searchTitle(event) {
    this.titlePostValue = event.target.value;
  }

  selectTitle(titre: string) {
    this.postService.titreFilter = titre;
  }
  resetFilter() {
    this.postService.keyWordsFilter = '';
  }

  resetTitleFilter() {
    this.postService.titreFilter = '';
  }
}
