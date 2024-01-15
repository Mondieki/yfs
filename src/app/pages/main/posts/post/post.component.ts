import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { increment } from '@angular/fire/firestore';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { arrayUnion } from '@firebase/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/core/services/auth.service';
import { MembersService } from 'src/app/core/services/members.service';
import { PostsService } from 'src/app/core/services/posts.service';
import { notEmptyNorWhitespace } from 'src/app/core/validators/whitespaces.validator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;

  user!: User;

  commentors: any[] = [];
  poster: any;

  commentForm: FormGroup<{
    comment: FormControl<string>;
  }> = this.fb.group({
    comment: ['', [notEmptyNorWhitespace()]]
  });

  userDetailsMap: { [userId: string]: any } = {};

  constructor(
    private actvRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private memberService: MembersService,
    private message: NzMessageService,
    private postsService: PostsService) { }

  ngOnInit() {
    this.actvRoute.params.subscribe((prms) => {
      this.postsService.getPostDetails(prms['id'])
        .then((resp: any) => {
          this.post = resp;

          this.fetchUserDetailsForComments();

          this.memberService.getMemberDetails(resp.postedBy)
            .then((snap) => {
              this.poster = snap;
            })
            .catch((errx) => this.poster = null)


          this.postsService.updatePostDetails(`${prms['id']}`, {
            viewCount: increment(1)
          });
        })
        .catch(err => { console.log(err) })
    });

    this.authService.getUserAuthObject()
      .then((user: any) => {
        this.user = user;
      })
      .catch(err => {
        console.log(err)
      })
  }

  submitComment() {
    if (this.commentForm.valid) {
      var comment = {
        comment: this.commentForm.value.comment,
        ID: this.generateRandomString(15),
        postedBy: this.user.uid,
        postedOn: new Date().getTime(),
      }

      this.postsService.updatePostDetails(this.post.ID, {
        commenters: arrayUnion(this.user.uid),
        comments: arrayUnion(comment),
        commentCount: increment(1)
      })
        .then(() => {
          this.showMessage('success', 'Your comment has been posted');
          this.post.comments.push(comment);
          this.commentForm.get('comment')?.setValue('');
        })
        .catch(err => {
          console.log(err);
        })
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

  fetchUserDetailsForComments() {
    this.post.comments.forEach((comment: any) => {
      this.memberService.getMemberDetails(comment.postedBy).then(userDetails => {
        this.userDetailsMap[comment.postedBy] = userDetails;
      });
    });
  }
}
