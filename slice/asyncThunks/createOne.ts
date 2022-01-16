import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirePost } from 'fireCMS/post';

import { postSlice } from '..';
import { REDUX_NAME } from '../../CONSTANTS';

interface PostFormData {
  content: string;
  thumbnail: string;
  title: string;
  source?: string;
}

export const createOne = createAsyncThunk(
  REDUX_NAME + '/createOne',
  async (formData: PostFormData, thunkApi) => {
    // db 등록
    const firePost = FirePost.Instance;
    const post = await firePost.insertOne(formData);
    // store 저장
    const dispatch = thunkApi.dispatch;
    const action = postSlice.actions.postAdded(post);
    dispatch(action);
  },
);
