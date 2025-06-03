import Persona from "../../modelo/persona";
import IRepository from "../IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';
import personas from "./listaPersonas";
import { randomUUID } from 'crypto';

let personaIdCounter = 100;

const StaticPersonaRepository: IRepository<Persona> = {
  async findAll(): Promise<Persona[]> {
    return personas;
  },

async findById(id: string): Promise<Persona | null> {
  return personas.find(p => p.id === id) || null;
},

  async save(persona: Persona): Promise<Persona> {
    persona.id = randomUUID();
    personas.push(persona);
    return persona;
  },

  async update(id: string, personaActualizada: Persona): Promise<boolean> {
    const index = personas.findIndex(p => p.id === id);
    if (index === -1) return false;

    personas[index] = personaActualizada;
    return true;
  },

  async delete(id: string): Promise<boolean> {
    const index = personas.findIndex(p => p.id === id);
    if (index === -1) return false;
    personas.splice(index, 1);
    return true;
  }
};

export default StaticPersonaRepository;
