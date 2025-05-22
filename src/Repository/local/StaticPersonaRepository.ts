import Persona from "../../modelo/persona";
import IRepository from "../IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';

let personas: Persona[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Díaz',
    dni: '23564897',
    fechaDeNacimiento: new Date(1997, 6, 7),
    genero: 'FEMENINO',
    autos: [Ferrari],
    esDonante: true
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Gómez',
    dni: '30567890',
    fechaDeNacimiento: new Date(1985, 2, 14),
    genero: 'MASCULINO',
    autos: [ToyotaCorolla, FordFiesta],
    esDonante: false
  },
  {
    id: 3,
    nombre: 'Lucía',
    apellido: 'Fernández',
    dni: '28956734',
    fechaDeNacimiento: new Date(1992, 10, 30),
    genero: 'FEMENINO',
    autos: [ChevroletCruze],
    esDonante: true
  },
  {
    id: 4,
    nombre: 'Pedro',
    apellido: 'Martínez',
    dni: '31876543',
    fechaDeNacimiento: new Date(1978, 5, 21),
    genero: 'MASCULINO',
    autos: [],
    esDonante: false
  },
  {
    id: 5,
    nombre: 'Mariana',
    apellido: 'Suárez',
    dni: '32765432',
    fechaDeNacimiento: new Date(1988, 7, 11),
    genero: 'FEMENINO',
    autos: [BMWX5],
    esDonante: true
  }
];

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
