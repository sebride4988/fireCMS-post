import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from 'fireCMS/post/types/Post';
import { SetAllParam } from 'fireCMS/post/types/SetAllParam';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

import { postSlice } from '..';
import { REDUX_NAME } from '../../CONSTANTS';

/**
 * 이메일
 */
export const setAll = createAsyncThunk(
  REDUX_NAME + '/setAll',
  async (param: SetAllParam, thunkApi) => {
    const db = getFirestore();
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

    // store 저장
    const dispatch = thunkApi.dispatch;
    const action = postSlice.actions.postsReceived(list);
    dispatch(action);
  },
  {},
);
