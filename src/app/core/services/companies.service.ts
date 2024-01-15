import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, orderBy, query, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private readonly firestore: Firestore) { }

  async createCompany(co: any) {
    return await setDoc(doc(this.firestore, "companies", co.ID), {
      ...co,
      addedOn: serverTimestamp()
    })
  }

  getAllCompanies$() {
    const neighbourhoodRef = collection(this.firestore, "companies")
    return collectionData(query(neighbourhoodRef, orderBy("name", "asc"))) as Observable<any[]>;
  }

  getAllCompanies() {
    return new Promise((resolve, reject) => {
      this.getAllCompanies$().pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }

  async updateCompanyDetails(ID: string, data: any) {
    return await updateDoc(doc(this.firestore, "companies", ID), {
      ...data
    });
  }

  getCompanyDetails$(ID: string) {
    return docData(doc(this.firestore, `companies/${ID}`), { idField: 'ID' })
  }

  getCompanyDetails(ID: string) {
    return new Promise((resolve, reject) => {
      this.getCompanyDetails$(ID).pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }
}
