import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirePost } from 'fireCMS/post';
import { SelectManyParam } from 'fireCMS/post/types/SelectManyParam';

import { postSlice } from '..';
import { REDUX_NAME } from '../../CONSTANTS';

export const readMany = createAsyncThunk(
  REDUX_NAME + '/readMany',
  async (param: SelectManyParam, thunkApi) => {
    // db 열람
    const firePost = FirePost.Instance;
    const posts = await firePost.selectMany(param);

    // store 저장
    const dispatch = thunkApi.dispatch;
    const action = postSlice.actions.postsReceived(posts);
    dispatch(action);
  },
  {},
);
