import { PostService } from 'src/app/services/post.service';
import { Post, KeyWord } from './../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {

  @Input() post: Post;

  // Pour la chip list
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  // sur le onUpdate

  onUpdatePost() {
    this.postService.updatePost(this.post);
  }
  // Pour la mat-MatChipInputEvent
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.post.keyWords.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(keyWord: KeyWord): void {
    const index = this.post.keyWords.indexOf(keyWord);

    if (index >= 0) {
      this.post.keyWords.splice(index, 1);
    }
  }
}
