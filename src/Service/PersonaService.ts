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
// no anda , ver
const agregar = (persona: Persona): number | string => {
  const error = validarPersona(persona);
  if (error)
  return error;

  const idAsignado = ListaPersonas.create(persona);
  return idAsignado;
};

//delete
const deleteP = (id : number) : boolean => {
  const index = listaPersonas.findIndex(p => p.id === id);
  if (index === -1){
      return false;
  }
  listaPersonas.splice(index,1);
  return true;
};
/*
// alternativa del delete con filter que anda
export const deleteP = (id: number): boolean  => {
  const persona = listaPersonas.find(p => p.id === id);
  if (!persona)
  return false;

  ListaPersonas.borrar(id);
  return true;
};
*/

export default {listarP, buscarid,agregar, deleteP};







