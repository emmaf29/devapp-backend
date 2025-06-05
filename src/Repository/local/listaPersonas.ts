import Persona from '../../modelo/persona';
import { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 } from './listaAutos';

const personas: Persona[] = [
  {
    _id: "uuid-ana",
    nombre: "Ana",
    apellido: "Díaz",
    dni: "23564897",
    fechaDeNacimiento: new Date(1997, 6, 7),
    genero: "FEMENINO",
    autos: [Ferrari],
    esDonante: true
  },
  {
    _id: "uuid-carlos",
    nombre: "Carlos",
    apellido: "Gómez",
    dni: "30567890",
    fechaDeNacimiento: new Date(1985, 2, 14),
    genero: "MASCULINO",
    autos: [ToyotaCorolla, FordFiesta],
    esDonante: false
  },
  {
    _id: "uuid-lucia",
    nombre: "Lucía",
    apellido: "Fernández",
    dni: "28956734",
    fechaDeNacimiento: new Date(1992, 10, 30),
    genero: "FEMENINO",
    autos: [ChevroletCruze],
    esDonante: true
  },
  {
    _id: "uuid-pedro",
    nombre: "Pedro",
    apellido: "Martínez",
    dni: "31876543",
    fechaDeNacimiento: new Date(1978, 5, 21),
    genero: "MASCULINO",
    autos: [],
    esDonante: false
  },
  {
    _id: "uuid-mariana",
    nombre: "Mariana",
    apellido: "Suárez",
    dni: "32765432",
    fechaDeNacimiento: new Date(1988, 7, 11),
    genero: "FEMENINO",
    autos: [BMWX5],
    esDonante: true
  }
];

export default personas;
