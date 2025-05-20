import Auto from "../modelo/auto";
import IRepository from "../repository/IRepository";
import RepositoryFactory from "../repository/RepositoryFactory";
import StaticAutoRepository from "../repository/StaticAutoRepository";

const autoRepo = RepositoryFactory.getAutoRepository();

const listarA = async (): Promise<Partial<Auto>[]> => {
  const autos = await autoRepo.findAll();
  return autos.map(a => ({
    id: a.id,
    marca: a.marca,
    modelo: a.modelo,
    anio: a.anio,
    patente: a.patente
  }));
};

const buscarPorId = async (id: number): Promise<Auto | undefined> => {
  return await autoRepo.findById(id);
};

const agregarA = async (auto: Omit<Auto, "id">): Promise<Auto | null> => {
  const autos = await autoRepo.findAll();
  if (autos.some(a => a.patente === auto.patente)) return null;

  return await autoRepo.save({ ...auto, id: 0 });
};

const editA = async (id: number, cambios: Partial<Auto>): Promise<boolean> => {
  return await autoRepo.update(id, cambios);
};

const deleteA = async (id: number): Promise<boolean> => {
  return await autoRepo.delete(id);
};

export default { listarA, buscarPorId, agregarA, editA, deleteA };
