
export default interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  save(entidad: T): Promise<T>;
  update(id: number, cambios: Partial<T>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

