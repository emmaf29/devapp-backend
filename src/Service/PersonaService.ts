import RepositoryFactory from "../repository/RepositoryFactory";
import Persona from "../modelo/persona";

const personaRepo = RepositoryFactory.getPersonaRepository();

const listarP = async () => {
  const personas = await personaRepo.findAll();
  return personas.map(p => ({
    id: p.id,
    dni: p.dni,
    nombre: p.nombre,
    apellido: p.apellido,
  }));
};

const buscarid = async (id: number): Promise<Persona | undefined> => {
  return await personaRepo.findById(id);
};

const addP = async (persona: Persona): Promise<number | null> => {
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

  const guardada = await personaRepo.save(nuevaPersona);
  return guardada.id;
};

const editP = async (id: number, cambios: Partial<Persona>): Promise<boolean> => {
  return await personaRepo.update(id, cambios);
};

const deleteP = async (id: number): Promise<boolean> => {
  return await personaRepo.delete(id);
};

export default { listarP, buscarid, addP, editP, deleteP };
