import Auto from "../../modelo/auto";

// Definir autos
const Ferrari: Auto = {
    _id: 1,
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
    _id: 2,
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
    _id: 3,
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
    _id: 4,
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
    _id: 5,
    idDuenio: 5,
    anio: 2023,
    color: 'Azul',
    marca: 'BMW',
    modelo: 'X5',
    motor: 'V8',
    patente: 'DEF999',
    numeroDeChasis: '987654'
};


export { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 };