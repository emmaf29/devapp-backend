import Auto from "../../modelo/auto";
import IRepository from "../IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from "./listaAutos";
import { randomUUID } from 'crypto';

let autos: Auto[] = [Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5];

const StaticAutoRepository: IRepository<Auto> = {
  async findAll(): Promise<Auto[]> {
    return autos;
  },

  async findById(id: string): Promise<Auto | null> {
    return autos.find(a => a._id === id) || null;
  },

  async save(auto: Auto): Promise<Auto> {
    auto._id = randomUUID();
    autos.push(auto);
    return auto;
  },

  async update(id: string, autoActualizado: Auto): Promise<boolean> {
    const index = autos.findIndex(a => a._id === id);
    if (index === -1) return false;

    autos[index] = autoActualizado;
    return true;
  },

  async delete(id: string): Promise<boolean> {
    const index = autos.findIndex(a => a._id === id);
    if (index === -1) return false;

    autos.splice(index, 1);
    return true;
  }
};

export default StaticAutoRepository;
