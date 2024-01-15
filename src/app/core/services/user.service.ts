import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, setDoc, doc, updateDoc, serverTimestamp, deleteDoc, docData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly firestore: Firestore) { }

  getAllUsers$() {
    const UsersRef = collection(this.firestore, "users")
    return collectionData(query(UsersRef, orderBy("name", "asc"))) as Observable<any[]>;
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.getAllUsers$()
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }

  async createUser(user: any) {
    return await setDoc(doc(this.firestore, "users", user.ID), {
      ...user,
      bio: null,
      companies: [],
      country: null,
      joined: serverTimestamp(),
      linkedin: '',
      photoURL: null,
      role: '',
      skills: [],
      twitter: '',
      url: '',
    })
  }

  async updateUser(ID: string, changes: any) {
    return await updateDoc(doc(this.firestore, "users", ID), {
      ...changes
    });
  }

  async deleteUser(user: any) {
    return deleteDoc(doc(this.firestore, "users", user.ID))
  }

  getUserDetails$(id: string) {
    return docData(doc(this.firestore, `users/${id}`), { idField: 'ID' })
  }

  getUserDetails(id: string) {
    return new Promise((resolve, reject) => {
      this.getUserDetails$(id)
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }
}
