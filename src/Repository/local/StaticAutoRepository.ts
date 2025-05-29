import Auto from "../../modelo/auto";
import IRepository from "../IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from "./listaAutos"

let autos: Auto[] = [Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5];
let autoIdCounter = 100;

const StaticAutoRepository: IRepository<Auto> = {
  async findAll(): Promise<Auto[]> {
    return autos;
  },

  async findById(id: number): Promise<Auto | undefined> {
    return autos.find(a => a._id === id);
  },

async save(auto: Auto): Promise<Auto> {
  auto._id = autoIdCounter++;
  autos.push(auto);
  return auto;
},

async update(id: number, autoActualizado: Auto): Promise<boolean> {
  const index = autos.findIndex(a => a._id === id);
  if (index === -1) return false;

  autos[index] = autoActualizado;
  return true;
},

  async delete(id: number): Promise<boolean> {
    const index = autos.findIndex(a => a._id === id);
    if (index === -1) return false;
    autos.splice(index, 1);
    return true;
  },
};

export default StaticAutoRepository;
