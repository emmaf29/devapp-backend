import Auto from './auto';

interface Persona {
    _id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: 'MASCULINO' | 'FEMENINO' | 'NO-BINARIO';
    autos: Auto[];
    esDonante: boolean;
}

export default Persona;