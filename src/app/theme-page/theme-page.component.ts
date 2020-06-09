import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { computed } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit {

  post: Post;
  constructor(
    public postService: PostService,
    private router: Router) { }

  ngOnInit() {
  }
  // @computed get firstPost() {
  //   return this.postService.getFilteredPosts[0];
  // }
  // @computed get secondPost() {
  //   return this.postService.getFilteredPosts[1];
  // }
  // @computed get thirdPost() {
  //   return this.postService.getFilteredPosts[2];
  // }
  // @computed get otherPosts() {
  //   return this.postService.getFilteredPosts.slice(3);
  // }
}
