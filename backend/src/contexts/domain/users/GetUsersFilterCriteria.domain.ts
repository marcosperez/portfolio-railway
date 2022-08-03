export interface Pagination {
  page: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: string;
}

export interface GetUsersFilterCriteria extends Pagination {
  filter?: string;
}
