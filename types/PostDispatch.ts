import { Dispatch, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { REDUX_NAME } from '../CONSTANTS';

import { initialState } from './../slice/index';

export type PostDispatch = Dispatch<AnyAction> &
  ThunkDispatch<
    {
      [REDUX_NAME]: typeof initialState;
    },
    null,
    AnyAction
  >;
