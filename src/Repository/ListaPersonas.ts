import Persona from "../modelo/persona";
import Auto from "../modelo/auto";
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';


let Personas : Persona[] = [];

//browse
const listarP = (): Persona[] => {
return Personas;
};


//delete
const borrar = (id: number) => {
    Personas = Personas.filter((p: Persona) => p.id !== id);
    return;
};


export default {listarP,borrar};





// Lista de personas con sus autos
const listaPersonas: Persona[] = [
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

export { listaPersonas };
