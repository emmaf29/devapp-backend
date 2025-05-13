import Persona from "../modelo/persona";
import IRepository from "./IRepository";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';


 //implemento lo que esta en irepository
 class StaticPersonaRepository implements IRepository<Persona> {
  private personas: Persona[] = [
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

  findAll(): Persona[] {
    return this.personas;
  }

  findById(id: number): Persona | undefined {
    return this.personas.find(p => p.id === id);
  }

  save(persona: Persona): Persona {
    persona.id = this.personas.length > 0 ? this.personas[this.personas.length - 1].id + 1 : 1;
    this.personas.push(persona);
    return persona;
  }

  update(id: number, cambios: Partial<Persona>): boolean {
    const persona = this.personas.find(p => p.id === id);
    if (!persona) return false;


    persona.nombre = cambios.nombre ?? persona.nombre;
    persona.apellido = cambios.apellido ?? persona.apellido;
    persona.dni = cambios.dni ?? persona.dni;
    persona.fechaDeNacimiento = cambios.fechaDeNacimiento ? new Date(cambios.fechaDeNacimiento) : persona.fechaDeNacimiento;
    persona.genero = cambios.genero ?? persona.genero;
    persona.autos = cambios.autos ?? persona.autos;
    persona.esDonante = cambios.esDonante ?? persona.esDonante;

    return true;
  }

  delete(id: number): boolean {
    const index = this.personas.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.personas.splice(index, 1);
    return true;
  }
}

export default new StaticPersonaRepository();

