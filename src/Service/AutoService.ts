import Auto from "../modelo/auto";
import IRepository from "../repository/IRepository";
import { RepositoryFactory } from "../repository/RepositoryFactory";
import { randomUUID } from "crypto";


const autoRepo = RepositoryFactory.autoRepository();

const listarA = async (): Promise<Partial<Auto>[]> => {
  const autos = await autoRepo.findAll();
  return autos.map(a => ({
    _id: a._id,
    marca: a.marca,
    modelo: a.modelo,
    anio: a.anio,
    patente: a.patente,
    _idDuenio: a._idDuenio
  }));
};

const buscarPorId = async (id: string): Promise<Auto | null> => {
  return await autoRepo.findById(id) || null;
};
const agregarA = async (auto: Omit<Auto, "_id">): Promise<Auto | false | null> => {
  const { marca, modelo, anio, color, patente, _idDuenio } = auto;

  if (
    typeof marca !== "string" ||
    typeof modelo !== "string" ||
    typeof anio !== "number" ||
    typeof color !== "string" ||
    typeof patente !== "string" ||
    typeof _idDuenio !== "string"
  ) {
    return null;
  }

  const autos = await autoRepo.findAll();
  if (autos.some(a => a.patente === patente)) {
    return false;
  }

  const autoConId: Auto = {
    ...auto,
     _idDuenio,
    _id: randomUUID(),
  };

  return await autoRepo.save(autoConId);
};

const editA = async (id: string, cambios: Partial<Auto>): Promise<boolean> => {
  const auto = await autoRepo.findById(id);
  if (!auto) return false;

  const autoActualizado = {
    ...auto,
    marca: cambios.marca ?? auto.marca,
    modelo: cambios.modelo ?? auto.modelo,
    anio: cambios.anio ?? auto.anio,
    color: cambios.color ?? auto.color,
    patente: cambios.patente ?? auto.patente,
   _idDuenio: cambios._idDuenio ?? auto._idDuenio,
  };

  return await autoRepo.update(id, autoActualizado);
};

const deleteA = async (id: string): Promise<boolean> => {
  return await autoRepo.delete(id);
};

export default { listarA, buscarPorId, agregarA, editA, deleteA };
