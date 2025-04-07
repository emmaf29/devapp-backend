import ListaPersonas, { listaPersonas } from "../Repository/ListaPersonas";
import Persona from "../Modelo/Persona";

//browse
const listarP = () => {
    return listaPersonas.map(p => ({
      dni: p.dni,
      nombre: p.nombre,
      apellido: p.apellido
    }));
  };


 //read
 const buscarid = (id: number): Persona | undefined => {
  return listaPersonas.find(p => p.id === id);
};

//add
const validarPersona = (p: Persona) => {
  if (
    !p.nombre || !p.apellido || !p.dni || !p.fechaDeNacimiento || !p.genero ||
    typeof p.esDonante !== 'boolean'
  ) {
    return 'Faltan datos obligatorios o son inválidos';
  }

  if (ListaPersonas.existeDni(p.dni)) {
    return `La persona con DNI ${p.dni} ya existe`;
  }

  return null;
};

const agregar = (persona: Persona): number | string => {
  const error = validarPersona(persona);
  if (error)
  return error;

  const idAsignado = ListaPersonas.create(persona);
  return idAsignado;
};// no anda , ver



export default {listarP, buscarid,agregar};





