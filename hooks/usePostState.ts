import { useSelector } from 'react-redux';

import { initialState } from '../slice/index';

type InitialState = typeof initialState;

export function usePostState(): InitialState;
export function usePostState<T>(fn: (post: InitialState) => T): T;
export function usePostState<T>(
  fn?: (post: InitialState) => T,
): InitialState | T {
  const postState = useSelector<{ post: InitialState }, InitialState | T>(
    (state) => (fn ? fn(state.post) : state.post),
  );

  return postState;
}
