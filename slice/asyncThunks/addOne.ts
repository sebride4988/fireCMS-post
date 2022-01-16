import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

import { postSlice } from '..';
import { REDUX_NAME } from '../../CONSTANTS';

interface PostFormData {
  content: string;
  thumbnail: string;
  title: string;
  source?: string;
}

export const addOne = createAsyncThunk(
  REDUX_NAME + '/addOne',
  async (formData: PostFormData, thunkApi) => {
    const db = getFirestore();
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
    // store 저장
    const dispatch = thunkApi.dispatch;
    const action = postSlice.actions.postAdded({
      id: doc.id,
      ...post,
    });
    dispatch(action);
  },
);
