import Auto from "../modelo/auto";
import ListaPersonas, { listaPersonas } from "../repository/listaPersonas";

//browse
const listarA = (id?: number) => {
    let autos;

    if (id) {
      const persona = listaPersonas.find(p => p.id === id);

      if (!persona) return [];
      autos = persona.autos;
    } else {
      autos = listaPersonas.flatMap(p => p.autos);
    }

    return autos.map(a => ({
      id : a.id,
      marca: a.marca,
      modelo: a.modelo,
      año: a.anio,
      patente: a.patente
    }));
  };

//read
const buscarIdDuenio = (id: number): Auto[] => {
const persona = listaPersonas.find(a=> a.id === id);
if(!persona) return [];
return persona.autos;
};

//add
const agregarA = (id: number, auto: Auto): Auto | null => {
  const {marca,modelo,anio, patente,color, numeroDeChasis,motor} = auto;

  if (typeof marca !== 'string' ||
    typeof modelo !== 'string' ||
    typeof anio !== 'number' ||
    typeof patente !== 'string' ||
    typeof color !== 'string' ||
    typeof numeroDeChasis !== 'string' ||
    typeof motor !== 'string'
  ) {
    return null;
  }

  const persona = listaPersonas.find(p => p.id === id);
  if (!persona)
  return null;

  const existe = persona.autos.some(a => a.patente === patente);
  if (existe)
  return null;

  const nuevoAuto: Auto = {
    id,
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

const editA = (id: number, cambios: Partial<Auto>): boolean => {
  const persona = listaPersonas.find(p =>p.autos.some(a => a.id === id)
  );
  if (!persona) return false;

  const auto = persona.autos.find(a => a.id === id);
  if (!auto) return false;

  const { marca, modelo, anio, patente, color, numeroDeChasis, motor } = cambios;

  if ((marca !== undefined && typeof marca !== 'string') ||
      (modelo !== undefined && typeof modelo !== 'string') ||
      (anio !== undefined && typeof anio !== 'number') ||
      (patente !== undefined && typeof patente !== 'string') ||
      (color !== undefined && typeof color !== 'string') ||
      (numeroDeChasis !== undefined && typeof numeroDeChasis !== 'string') ||
      (motor !== undefined && typeof motor !== 'string')) {
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
  for (const persona of listaPersonas) {
    const index = persona.autos.findIndex(a => a.id === id);
    if (index !== -1) {
      persona.autos.splice(index, 1);
      return true;
    }
  }
  return false;
};

export default { listarA, buscarIdDuenio, agregarA, editA, deleteA};
