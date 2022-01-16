import {
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';

import { REDUX_NAME } from '../CONSTANTS';
import { Post } from '../types/Post';

import { addOne } from './asyncThunks/addOne';
import { setAll } from './asyncThunks/setAll';

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
    addOne: {
      loading: false,
      error: null as SerializedError | null,
    },
    setAll: {
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
    builder.addCase(addOne.pending, (state, action) => {
      state.networkStatus.addOne.loading = true;
      state.networkStatus.addOne.error = null;
    });
    builder.addCase(addOne.fulfilled, (state, action) => {
      state.networkStatus.addOne.loading = false;
    });
    builder.addCase(addOne.rejected, (state, action) => {
      state.networkStatus.addOne.loading = false;
      state.networkStatus.addOne.error = action.error;
    });
    /**
     * ========== 글 불러오기 =============
     */
    builder.addCase(setAll.pending, (state, action) => {
      state.networkStatus.setAll.loading = true;
      state.networkStatus.setAll.error = null;
    });
    builder.addCase(setAll.fulfilled, (state, action) => {
      state.networkStatus.setAll.loading = false;
    });
    builder.addCase(setAll.rejected, (state, action) => {
      state.networkStatus.setAll.loading = false;
      state.networkStatus.setAll.error = action.error;
    });
  },
});
