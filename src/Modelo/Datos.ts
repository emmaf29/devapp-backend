import Auto from './Auto';
import Persona from './Persona';

// Definir un auto
const Ferrari: Auto = {
    año: 2003,
    color: 'blanco',
    marca: 'ferrari',
    modelo: 'qsy',
    motor: 'V7',
    patente: 'ABC123',
    numeroDeChasis: '123456'
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
    }
];

export { listaPersonas };
