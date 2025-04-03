import Auto from './Auto';
import Persona from './Persona';

// Definir autos
const Ferrari: Auto = {
    idDuenio: 1,
    anio: 2003,
    color: 'Blanco',
    marca: 'Ferrari',
    modelo: 'QSY',
    motor: 'V7',
    patente: 'ABC123',
    numeroDeChasis: '123456'
};

const ToyotaCorolla: Auto = {
    idDuenio: 2,
    anio: 2020,
    color: 'Gris',
    marca: 'Toyota',
    modelo: 'Corolla',
    motor: 'V4',
    patente: 'XYZ789',
    numeroDeChasis: '654321'
};

const FordFiesta: Auto = {
    idDuenio: 2,
    anio: 2019,
    color: 'Rojo',
    marca: 'Ford',
    modelo: 'Fiesta',
    motor: 'V4',
    patente: 'LMN456',
    numeroDeChasis: '789123'
};

const ChevroletCruze: Auto = {
    idDuenio: 3,
    anio: 2022,
    color: 'Negro',
    marca: 'Chevrolet',
    modelo: 'Cruze',
    motor: 'V6',
    patente: 'PQR678',
    numeroDeChasis: '321654'
};

const BMWX5: Auto = {
    idDuenio: 5,
    anio: 2023,
    color: 'Azul',
    marca: 'BMW',
    modelo: 'X5',
    motor: 'V8',
    patente: 'DEF999',
    numeroDeChasis: '987654'
};

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
