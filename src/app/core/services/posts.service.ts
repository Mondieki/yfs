import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, orderBy, query, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly firestore: Firestore) { }

  async createPost(post: any) {
    return await setDoc(doc(this.firestore, "posts", post.ID), {
      ...post,
      commentCount: 0,
      commenters: [],
      comments: [],
      downvoters: [],
      postedOn: serverTimestamp(),
      upvoters: [],
      viewCount: 1,
      viewers: [],
      votes: 0,
    })
  }

  getAllPosts$() {
    const neighbourhoodRef = collection(this.firestore, "posts")
    return collectionData(query(neighbourhoodRef, orderBy("postedOn", "desc"))) as Observable<any[]>;
  }

  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.getAllPosts$().pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }

  async updatePostDetails(ID: string, data: any) {
    return await updateDoc(doc(this.firestore, "posts", ID), {
      ...data
    });
  }

  getPostDetails$(ID: string) {
    return docData(doc(this.firestore, `posts/${ID}`), { idField: 'ID' })
  }

  getPostDetails(ID: string) {
    return new Promise((resolve, reject) => {
      this.getPostDetails$(ID).pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }
}
