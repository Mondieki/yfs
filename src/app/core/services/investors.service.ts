import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  constructor(private readonly firestore: Firestore) { }

  async createInvestor(vc: any) {
    return await setDoc(doc(this.firestore, "investors", vc.ID), {
      ...vc
    })
  }

  getAllInvestors$() {
    const neighbourhoodRef = collection(this.firestore, "investors")
    return collectionData(query(neighbourhoodRef, orderBy("fund_name", "asc"))) as Observable<any[]>;
  }

  getAllInvestors() {
    return new Promise((resolve, reject) => {
      this.getAllInvestors$().pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }

  async updateInvestorDetails(ID: string, data: any) {
    return await updateDoc(doc(this.firestore, "investors", ID), {
      ...data
    });
  }

  getInvestorDetails$(ID: string) {
    return docData(doc(this.firestore, `investors/${ID}`), { idField: 'ID' })
  }

  getInvestorDetails(ID: string) {
    return new Promise((resolve, reject) => {
      this.getInvestorDetails$(ID).pipe(take(1))
        .subscribe((resp) => {
          resolve(resp)
        })
    })
  }
}
