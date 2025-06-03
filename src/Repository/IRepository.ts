
export default interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

