import { FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore as _Firestore } from 'firebase/firestore';

import { postSlice } from './slice';

export class FirePost {
  private static _instance: FirePost;
  private static _firestore?: _Firestore;

  public static initialize(firebaseApp: FirebaseApp) {
    this._firestore = getFirestore(firebaseApp);
  }

  public static get Firestore() {
    if (!this._firestore) {
      throw new Error('Firestore is not initialized');
    }
    return this._firestore;
  }

  public static reducer = postSlice.reducer;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}
