export interface ApiResponse<T> {
  status: boolean;
  reason: string;
  errors: string[];
  data: T;
}

export interface DefaultQueryResponse {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  reason: string;
}
