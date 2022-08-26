export interface PageData<T> {
  list: Array<T>;
  count: number;
}

export interface DefaultRepository<T, U> {
  create(user: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  find(where: U): Promise<Array<T>>;
  count(where: U): Promise<number>;
  update(id: string, user: T): Promise<T>;
  delete(id: string): Promise<void>;
}
