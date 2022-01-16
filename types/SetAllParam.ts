export type SetAllParam<TSorter = any, TFilter = any> = {
  limit: number;
  startAfter?: string;
  sorter?: TSorter;
  filter?: TFilter;
};
