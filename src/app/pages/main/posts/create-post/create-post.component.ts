import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { POST_TAGS } from 'src/app/core/consts/_posts';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;

  user!: User;

  tags = POST_TAGS;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private postService: PostsService,
    private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
      tags: [[]]
    });

    this.auth.getUserAuthObject()
      .then((user: any) => {
        this.user = user;
      })
      .catch(err => {
        console.log(err)
      })
  }

  submitForm(): void {
    if (this.postForm.valid) {
      var post = {
        ID: this.generateRandomString(20),
        ...this.postForm.value,
        postedBy: this.user.uid
      }
      this.postService.createPost(post)
        .then(() => {
          this.showMessage('success', `Created post.`);
          this.router.navigate(['/posts']);
        })
        .catch(err => {
          this.showMessage('error', `Could not create your post at the moment`);
        })
    } else {
      Object.values(this.postForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg, {
      nzDuration: 5000
    });
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
