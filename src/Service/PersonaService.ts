import ListaPersonas, { listaPersonas } from "../repository/listaPersonas";
import Persona from "../modelo/persona";


//browse
const listarP = () => {
    return listaPersonas.map(p => ({
      id : p.id,
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
const addP = (Persona : Persona): number | null => {
    const {nombre,apellido,id,dni,fechaDeNacimiento,genero,autos,esDonante} = Persona;

    // campos obligatorios
 if (typeof nombre !== 'string' ||
typeof apellido !== 'string' ||
typeof dni !== 'string' ||
typeof fechaDeNacimiento !== 'string' ||
typeof genero !== 'string' ||
!Array.isArray(autos) ||
typeof esDonante !== 'boolean') {
return null;
}
// id maximo para cambiar el largo;
 const nuevaPersona: Persona = {
  id: listaPersonas.length +1,
  nombre,
  apellido,
  dni,
  fechaDeNacimiento: new Date(fechaDeNacimiento),
  genero,
  autos,
  esDonante
};

listaPersonas.push(nuevaPersona);
return nuevaPersona.id;
}

// edit

export const editP= (id: number, cambios: Partial<Persona>): boolean => {
  const persona = listaPersonas.find(p => p.id === id);
  if (!persona)
  return false;


  const { nombre, apellido, dni, fechaDeNacimiento, genero, autos, esDonante } = cambios;
// campos opcionales
  if ((nombre !== undefined && typeof nombre !== 'string') ||
      (apellido !== undefined && typeof apellido !== 'string') ||
      (dni !== undefined && typeof dni !== 'string') ||
      (fechaDeNacimiento !== undefined && typeof fechaDeNacimiento !== 'string') ||
      (genero !== undefined && typeof genero !== 'string') ||
      (autos !== undefined && !Array.isArray(autos)) ||
      (esDonante !== undefined && typeof esDonante !== 'boolean')) {
    return false;
  }

    persona.nombre = cambios.nombre ?? persona.nombre;
    persona.apellido = cambios.apellido ?? persona.apellido;
    persona.dni = cambios.dni ?? persona.dni;
    persona.fechaDeNacimiento = cambios.fechaDeNacimiento? new Date(cambios.fechaDeNacimiento): persona.fechaDeNacimiento;
    persona.genero = cambios.genero ?? persona.genero;
    persona.autos = cambios.autos ?? persona.autos;
    persona.esDonante = cambios.esDonante ?? persona.esDonante;

return true;
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

export default {listarP, buscarid,addP,editP,deleteP};

