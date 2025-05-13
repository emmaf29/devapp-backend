
export default interface IRepository<T> {
  findAll(): T[];
  findById(id: number): T | undefined;
  save(entidad: T): T;
  update(id: number, cambios: Partial<T>): boolean;
  delete(id: number): boolean;
}
// defino la interfaz del repo