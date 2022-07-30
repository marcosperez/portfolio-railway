import { Pagination } from "../Domain.common";

export interface GetUsersFilterCriteria extends Pagination {
  filter?: string;
}
