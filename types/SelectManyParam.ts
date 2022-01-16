export type SelectManyParam<TSorter = any, TFilter = any> = {
  limit: number;
  startAfter?: string;
  sorter?: TSorter;
  filter?: TFilter;
};
