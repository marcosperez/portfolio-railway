export type Ok = boolean;
export type ServiceResult<T> = [Ok, T | undefined];

export interface Service<T, R> {
  execute(params: T): Promise<ServiceResult<R | undefined>>;
}
