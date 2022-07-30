export type Maybe<T> = T | undefined | null;

export interface Pagination {
  page: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: string;
}
