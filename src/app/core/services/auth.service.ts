import { Injectable, inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  user!: User | null;

  getAuth = getAuth();

  constructor(
    private message: NzMessageService,
    private router: Router) {

    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      // console.log(aUser);
      this.user = aUser;
    })
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.getAuth, email, password)
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.getAuth, email, password)
  }

  signOut() {
    return signOut(this.getAuth);
  }

  getUserAuthObject() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.getAuth, (user) => {
        if (user) {
          resolve(user)
        } else {
          console.log(`no user`)
          // this.router.navigate(['/auth/login']);
          this.showMessage('warning', 'You are not logged in');
          resolve(null)
        }
      });
    });
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg, {
      nzDuration: 5000
    });
  }
}
