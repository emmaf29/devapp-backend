import RepositoryFactory from "../repository/RepositoryFactory";
import Persona from "../modelo/persona";

const personaRepo = RepositoryFactory.getPersonaRepository();

const listarP = () => {
  return personaRepo.findAll().map(p => ({
    id: p.id,
    dni: p.dni,
    nombre: p.nombre,
    apellido: p.apellido,
  }));
};

const buscarid = (id: number): Persona | undefined => {
  return personaRepo.findById(id);
};

const addP = (persona: Persona): number | null => {
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
    id: 0,
    nombre,
    apellido,
    dni,
    fechaDeNacimiento: new Date(fechaDeNacimiento),
    genero,
    autos,
    esDonante,
  };

  const guardada = personaRepo.save(nuevaPersona);
  return guardada.id;
};

const editP = (id: number, cambios: Partial<Persona>): boolean => {
  return personaRepo.update(id, cambios);
};

const deleteP = (id: number): boolean => {
  return personaRepo.delete(id);
};

export default { listarP, buscarid, addP, editP, deleteP };

