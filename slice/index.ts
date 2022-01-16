import {
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';

import { REDUX_NAME } from '../CONSTANTS';
import { Post } from '../types/Post';

import { createOne } from './asyncThunks/createOne';
import { readMany } from './asyncThunks/readMany';

const postsAdapter = createEntityAdapter<Post>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (post) => post.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => {
    const aCreatedAt = new Date(a.createdAt).valueOf();
    const bCreatedAt = new Date(b.createdAt).valueOf();
    if (aCreatedAt > bCreatedAt) return 1;
    if (aCreatedAt < bCreatedAt) return -1;
    return 0;
  },
});

export const initialState = postsAdapter.getInitialState({
  networkStatus: {
    createOne: {
      loading: false,
      error: null as SerializedError | null,
    },
    readMany: {
      loading: false,
      error: null as SerializedError | null,
    },
  },
});

export const postSlice = createSlice({
  name: REDUX_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    postAdded: postsAdapter.addOne,
    postsReceived: postsAdapter.setAll,
  },
  extraReducers: (builder) => {
    /**
     * ========== 글 등록 =============
     */
    builder.addCase(createOne.pending, (state, action) => {
      state.networkStatus.createOne.loading = true;
      state.networkStatus.createOne.error = null;
    });
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.networkStatus.createOne.loading = false;
    });
    builder.addCase(createOne.rejected, (state, action) => {
      state.networkStatus.createOne.loading = false;
      state.networkStatus.createOne.error = action.error;
    });
    /**
     * ========== 글 불러오기 =============
     */
    builder.addCase(readMany.pending, (state, action) => {
      state.networkStatus.readMany.loading = true;
      state.networkStatus.readMany.error = null;
    });
    builder.addCase(readMany.fulfilled, (state, action) => {
      state.networkStatus.readMany.loading = false;
    });
    builder.addCase(readMany.rejected, (state, action) => {
      state.networkStatus.readMany.loading = false;
      state.networkStatus.readMany.error = action.error;
    });
  },
});
