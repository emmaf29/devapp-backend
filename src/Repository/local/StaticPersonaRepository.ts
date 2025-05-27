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

  async update(id: number, cambios: Partial<Persona>): Promise<boolean> {
    const persona = personas.find(p => p.id === id);
    if (!persona) return false;

    persona.nombre = cambios.nombre ?? persona.nombre;
    persona.apellido = cambios.apellido ?? persona.apellido;
    persona.dni = cambios.dni ?? persona.dni;
    persona.fechaDeNacimiento = cambios.fechaDeNacimiento ? new Date(cambios.fechaDeNacimiento) : persona.fechaDeNacimiento;
    persona.genero = cambios.genero ?? persona.genero;
    persona.autos = cambios.autos ?? persona.autos;
    persona.esDonante = cambios.esDonante ?? persona.esDonante;

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
