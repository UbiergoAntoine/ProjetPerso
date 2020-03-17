import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { computed } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post: Post;
  constructor(
    private router: Router) { }

  ngOnInit() {
  }

}
