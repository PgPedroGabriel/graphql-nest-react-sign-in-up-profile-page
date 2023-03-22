export interface IRepository<T> {
  get(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  save(input: T): Promise<void>;
  update(input: T): Promise<T>;
}
