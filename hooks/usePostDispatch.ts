import { useDispatch } from 'react-redux';

import { PostDispatch } from '../types/PostDispatch';

export function usePostDispatch() {
  return useDispatch<PostDispatch>();
}
