import { Post } from './../../models/post.model';
import { BlocNotesService } from './../../services/bloc-notes.service';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { computed, observable } from 'mobx-angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() post: Post;
  selected = '';
  @observable keyWordsPostValue: string;
  @observable titlePostValue: string;
  constructor(
    public postService: PostService,
    public blocnotesService: BlocNotesService) { }

  ngOnInit() { }
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
