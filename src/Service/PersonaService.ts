import { RepositoryFactory } from "../repository/RepositoryFactory";
import Persona from "../modelo/persona";
import { randomUUID } from 'crypto';

const personaRepo = RepositoryFactory.personaRepository();


const listarP = async () => {
  const personas = await personaRepo.findAll();
  return personas.map(p => ({
    _id: p._id,
    dni: p.dni,
    nombre: p.nombre,
    apellido: p.apellido,
  }));
};

const buscarid = async (id: string): Promise<Persona | null> => {
  return await personaRepo.findById(id);
};

const addP = async (persona: Omit<Persona, "_id">): Promise<string | null> => {
  const { nombre, apellido, dni, fechaDeNacimiento, genero, autos, esDonante } = persona;

  if (
    typeof nombre !== "string" ||
    typeof apellido !== "string" ||
    typeof dni !== "string" ||
    typeof fechaDeNacimiento !== "string" ||
    typeof genero !== "string" ||
    !Array.isArray(autos) ||
    typeof esDonante !== "boolean"
  ) {
    return null;
  }

  const nuevaPersona: Persona = {
    _id: randomUUID(),
    nombre,
    apellido,
    dni,
    fechaDeNacimiento: new Date(fechaDeNacimiento),
    genero,
    autos,
    esDonante,
  };

  const guardada = await personaRepo.save(nuevaPersona);
  return guardada._id;
};

const editP = async (id: string, cambios: Partial<Persona>): Promise<boolean | null> => {
  const persona = await personaRepo.findById(id);
  if (!persona) return false;

  const {
    nombre,
    apellido,
    dni,
    fechaDeNacimiento,
    genero,
    autos,
    esDonante,
  } = cambios;


  if (
    (nombre !== undefined && typeof nombre !== "string") ||
    (apellido !== undefined && typeof apellido !== "string") ||
    (dni !== undefined && typeof dni !== "number") ||
    (fechaDeNacimiento !== undefined && typeof fechaDeNacimiento !== "string") ||
    (genero !== undefined && typeof genero !== "string") ||
    (autos !== undefined && !Array.isArray(autos)) ||
    (esDonante !== undefined && typeof esDonante !== "boolean")
  ) {
    return null;
  }

  persona.nombre = nombre ?? persona.nombre;
  persona.apellido = apellido ?? persona.apellido;
  persona.dni = dni ?? persona.dni;
  persona.fechaDeNacimiento = fechaDeNacimiento
    ? new Date(fechaDeNacimiento)
    : persona.fechaDeNacimiento;
  persona.genero = genero ?? persona.genero;
  persona.autos = autos ?? persona.autos;
  persona.esDonante = esDonante ?? persona.esDonante;

  return await personaRepo.update(id, persona);
};


const deleteP = async (id: string): Promise<boolean> => {
  return await personaRepo.delete(id);
};

export default { listarP, buscarid, addP, editP, deleteP };
