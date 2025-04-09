import Auto from "../Modelo/Auto";
import ListaPersonas, { listaPersonas } from "../Repository/ListaPersonas";

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
      id : a.idDuenio,
      marca: a.marca,
      modelo: a.modelo,
      año: a.anio,
      patente: a.patente
    }));
  };

//read
const buscarIdDuenio = (idDuenio: number): Auto[] => {
const persona = listaPersonas.find(a=> a.id === idDuenio);
if(!persona) return [];
return persona.autos;
};

//add
const agregarA = (idDuenio: number, auto: Auto): Auto | null => {
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

  const persona = listaPersonas.find(p => p.id === idDuenio);
  if (!persona)
  return null;

  const existe = persona.autos.some(a => a.patente === patente);
  if (existe)
  return null;

  const nuevoAuto: Auto = {
    idDuenio,
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

//edit
const editA = (idDuenio: number, patente: string, cambios: Partial<Auto>): boolean => {
  const persona = listaPersonas.find(p => p.id === idDuenio);
  if (!persona) return false;

  const auto = persona.autos.find(a => a.patente === patente);
  if (!auto) return false;


  const { marca, modelo, anio, color, numeroDeChasis, motor } = cambios;

  if ((marca !== undefined && typeof marca !== 'string') ||
      (modelo !== undefined && typeof modelo !== 'string') ||
      (anio !== undefined && typeof anio !== 'number') ||
      (color !== undefined && typeof color !== 'string') ||
      (numeroDeChasis !== undefined && typeof numeroDeChasis !== 'string') ||
      (motor !== undefined && typeof motor !== 'string')) {
    return false;
  }


  auto.marca = cambios.marca ?? auto.marca;
  auto.modelo = cambios.modelo ?? auto.modelo;
  auto.anio = cambios.anio ?? auto.anio;
  auto.color = cambios.color ?? auto.color;
  auto.numeroDeChasis = cambios.numeroDeChasis ?? auto.numeroDeChasis;
  auto.motor = cambios.motor ?? auto.motor;

  return true;
};

//delete
const deleteA = (idDuenio: number, patente: string): boolean => {
  const persona = listaPersonas.find(p => p.id === idDuenio);
  if (!persona) return false;

  const index = persona.autos.findIndex(a => a.patente === patente);
  if (index === -1) return false;

  persona.autos.splice(index, 1);
  return true;
};


export default { listarA, buscarIdDuenio, agregarA, editA, deleteA};
