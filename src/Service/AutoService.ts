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

  export default { listarA };
