import { Injectable } from '@angular/core';
import { Firestore, setDoc, doc, collection, collectionData, orderBy, updateDoc, docData, query } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private readonly firestore: Firestore) { }


  getAllMembers$() {
    const neighbourhoodRef = collection(this.firestore, "users")
    return collectionData(query(neighbourhoodRef, orderBy("name", "asc"))) as Observable<any[]>;
  }

  getAllMembers() {
    return new Promise((resolve, reject) => {
      this.getAllMembers$().pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }

  async updateMemberDetails(ID: string, data: any) {
    return await updateDoc(doc(this.firestore, "users", ID), {
      ...data
    });
  }

  getMemberDetails$(ID: string) {
    return docData(doc(this.firestore, `users/${ID}`), { idField: 'ID' })
  }

  getMemberDetails(ID: string) {
    return new Promise((resolve, reject) => {
      this.getMemberDetails$(ID).pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }
}
