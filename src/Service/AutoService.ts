import Auto from "../modelo/auto";
import IRepository from "../repository/IRepository";
import StaticPersonaRepository from "../repository/StaticPersonaRepository";
import Persona from "../modelo/persona";

let autoIdCounter = 100;
const personaRepo: IRepository<Persona> = StaticPersonaRepository;

//browse
const listarA = (idDuenio?: number) => {
  let autos: Auto[];

  if (idDuenio) {
    const persona = personaRepo.findAll().find((p: Persona) => p.id === idDuenio);
    if (!persona) return [];
    autos = persona.autos;
  } else {
    autos = personaRepo.findAll().flatMap((p: Persona) => p.autos);
  }

  return autos.map((a: Auto) => ({
    id: a.id,
    marca: a.marca,
    modelo: a.modelo,
    anio: a.anio,
    patente: a.patente
  }));
};

//read
const buscarPorId = (id: number): Auto | undefined => {
  for (const persona of personaRepo.findAll()) {
    const auto = persona.autos.find((a: Auto) => a.id === id);
    if (auto) {
      return auto;
    }
  }
  return undefined;
};

//add
const agregarA = (idDuenio: number, auto: Omit<Auto, "id" | "idDuenio">): Auto | null => {
  const { marca, modelo, anio, patente, color, numeroDeChasis, motor } = auto;

  if (
    typeof marca !== 'string' ||
    typeof modelo !== 'string' ||
    typeof anio !== 'number' ||
    typeof patente !== 'string' ||
    typeof color !== 'string' ||
    typeof numeroDeChasis !== 'string' ||
    typeof motor !== 'string'
  ) {
    return null;
  }

  const persona = personaRepo.findAll().find((p: Persona) => p.id === idDuenio);
  if (!persona) return null;

  const existe = persona.autos.some((a: Auto) => a.patente === patente);
  if (existe) return null;

  const nuevoAuto: Auto = {
    id: autoIdCounter++,
    idDuenio: idDuenio,
    marca,
    modelo,
    anio,
    patente,
    color,
    numeroDeChasis,
    motor
  };

  persona.autos.push(nuevoAuto);

  return nuevoAuto;
};

//Edit
const editA = (id: number, cambios: Partial<Auto>): boolean => {
  const persona = personaRepo.findAll().find((p: Persona) =>
    p.autos.some((a: Auto) => a.id === id)
  );
  if (!persona) return false;

  const auto = persona.autos.find((a: Auto) => a.id === id);
  if (!auto) return false;

  const { marca, modelo, anio, patente, color, numeroDeChasis, motor } = cambios;

  if (
    (marca !== undefined && typeof marca !== 'string') ||
    (modelo !== undefined && typeof modelo !== 'string') ||
    (anio !== undefined && typeof anio !== 'number') ||
    (patente !== undefined && typeof patente !== 'string') ||
    (color !== undefined && typeof color !== 'string') ||
    (numeroDeChasis !== undefined && typeof numeroDeChasis !== 'string') ||
    (motor !== undefined && typeof motor !== 'string')
  ) {
    return false;
  }

  auto.marca = marca ?? auto.marca;
  auto.modelo = modelo ?? auto.modelo;
  auto.anio = anio ?? auto.anio;
  auto.patente = patente ?? auto.patente;
  auto.color = color ?? auto.color;
  auto.numeroDeChasis = numeroDeChasis ?? auto.numeroDeChasis;
  auto.motor = motor ?? auto.motor;

  return true;
};

//delete
const deleteA = (id: number): boolean => {
  for (const persona of personaRepo.findAll()) {
    const index = persona.autos.findIndex((a: Auto) => a.id === id);
    if (index !== -1) {
      persona.autos.splice(index, 1);
      return true;
    }
  }
  return false;
};

export default { listarA, buscarPorId, agregarA, editA, deleteA };