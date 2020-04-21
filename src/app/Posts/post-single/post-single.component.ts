import { Post } from 'src/app/models/post.model';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { observable, computed } from 'mobx-angular';
@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
  @observable postId: string;
  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params.id;
    });
  }
  onBack() {
    this.router.navigate(['/posts']);
  }

  @computed get post(): Post {
    return this.postService.getSinglePost(this.postId);
  }
  onDeletePost(post: Post) {
    this.postService.removePost(post);
    this.router.navigate(['/posts']);
  }
  onEditPost(id: string) {
    this.router.navigate(['/posts', 'edit', id]);

  }
}
