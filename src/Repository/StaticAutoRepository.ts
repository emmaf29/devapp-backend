import Auto from "../modelo/auto";
import IRepository from "./IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from "../repository/listaAutos";

let autos: Auto[] = [Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5];
let autoIdCounter = 100;

const StaticAutoRepository: IRepository<Auto> = {
  async findAll(): Promise<Auto[]> {
    return autos;
  },

  async findById(id: number): Promise<Auto | undefined> {
    return autos.find(a => a.id === id);
  },

async save(auto: Auto): Promise<Auto> {
  if (!auto || !auto.marca || !auto.modelo || !auto.anio || !auto.color || !auto.patente) {
    throw new Error("Datos de auto incompletos");
  }
  auto.id = autoIdCounter++;
  autos.push(auto);
  return auto;
},

async update(id: number, cambios: Partial<Auto>): Promise<boolean> {
  const index = autos.findIndex(a => a.id === id);
  if (index === -1) return false;

  const auto = autos[index];

  auto.marca = cambios.marca ?? auto.marca;
  auto.modelo = cambios.modelo ?? auto.modelo;
  auto.anio = cambios.anio ?? auto.anio;
  auto.color = cambios.color ?? auto.color;
  auto.patente = cambios.patente ?? auto.patente;

  return true;
},

  async delete(id: number): Promise<boolean> {
    const index = autos.findIndex(a => a.id === id);
    if (index === -1) return false;
    autos.splice(index, 1);
    return true;
  },
};

export default StaticAutoRepository;
