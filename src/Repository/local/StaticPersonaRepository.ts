import Persona from "../../modelo/persona";
import IRepository from "../IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';
import personas from "./listaPersonas";


let personaIdCounter = 100;

const StaticPersonaRepository: IRepository<Persona> = {
  async findAll(): Promise<Persona[]> {
    return personas;
  },

  async findById(id: number): Promise<Persona | undefined> {
    return personas.find(p => p.id === id);
  },

  async save(persona: Persona): Promise<Persona> {
    persona.id = personaIdCounter++;
    personas.push(persona);
    return persona;
  },

async update(id: number, personaActualizada: Persona): Promise<boolean> {
  const index = personas.findIndex(p => p.id === id);
  if (index === -1) return false;

  personas[index] = personaActualizada;
  return true;
},

  async delete(id: number): Promise<boolean> {
    const index = personas.findIndex(p => p.id === id);
    if (index === -1) return false;
    personas.splice(index, 1);
    return true;
  }
};

export default StaticPersonaRepository;
