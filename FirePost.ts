import { FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore as _Firestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';

import { postSlice } from './slice';
import { Post } from './types/Post';
import { SelectManyParam } from './types/SelectManyParam';

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

  async insertOne(formData: {
    content: string;
    thumbnail: string;
    title: string;
    source?: string;
  }) {
    const db = FirePost.Firestore;
    const postCollection = collection(db, 'Post');
    const post = {
      title: formData.title,
      content: formData.content,
      thumbnail: formData.thumbnail,
      createdAt: new Date().toUTCString(),
      updatedAt: null,
    };
    // db 등록
    const doc = await addDoc(postCollection, post);

    return {
      id: doc.id,
      ...post,
    };
  }

  async selectMany(param: SelectManyParam) {
    const db = FirePost.Firestore;
    const postCollection = collection(db, 'Post');
    const orderQuery = orderBy('createdAt', 'desc');
    const limitQuery = limit(param.limit);
    const startAfterQuery = startAfter(param.startAfter);
    const queryConstraints = param.startAfter
      ? [orderQuery, startAfterQuery, limitQuery]
      : [orderQuery, limitQuery];
    const postQuery = query(postCollection, ...queryConstraints);
    const querySnapshot = await getDocs(postQuery);
    const list: Post[] = [];
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        source: data.source,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return list;
  }
}
