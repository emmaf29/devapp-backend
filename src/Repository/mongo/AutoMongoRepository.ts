import connectToMongo from "../../coneccion/mongo"
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";

export class MongoAutoRepository implements IRepository<Auto> {
  private async collection() {
    const db = await connectToMongo();
    return db.collection("personas");
  }

  async findAll(): Promise<Auto[]> {
    const coleccion = await this.collection();
    const personas = await coleccion.find().toArray();
    return personas.flatMap((p: any) => p.autos || []);
  }

  async findById(id: number): Promise<Auto | undefined> {
    const autos = await this.findAll();
    return autos.find(a => a._id === id);
  }

  private generarNuevoId(autos: Auto[]): number {
    return autos.length ? Math.max(...autos.map(a => a._id ?? 0)) + 1 : 1;
  }

  private async actualizarPersona(personaId: number, autos: Auto[]) {
    const coleccion = await this.collection();
    await coleccion.updateOne({ id: personaId }, { $set: { autos } });
  }

  async save(auto: Auto): Promise<Auto> {
  if (auto._id) throw new Error("El auto ya existe, para modificar usa update.");

  const coleccion = await this.collection();
  const persona = await coleccion.findOne({ id: auto.idDuenio });

  if (!persona) throw new Error("Persona no encontrada");

  const autos = persona.autos || [];
  auto._id = this.generarNuevoId(await this.findAll());

  autos.push(auto);

  await this.actualizarPersona(auto.idDuenio, autos);
  return auto;
}

async update(id: number, cambios: Partial<Auto>): Promise<boolean> {
  const coleccion = await this.collection();

  const persona = await coleccion.findOne({ 'autos._id': id });
  if (!persona) return false;

  const autos = persona.autos || [];
  const auto = autos.find((a: Auto) => a._id === id);
  if (!auto) return false;

  auto.marca = cambios.marca ?? auto.marca;
  auto.modelo = cambios.modelo ?? auto.modelo;
  auto.anio = cambios.anio ?? auto.anio;
  auto.color = cambios.color ?? auto.color;
  auto.patente = cambios.patente ?? auto.patente;

  await coleccion.updateOne({ id: persona.id }, { $set: { autos } });
  return true;

}

  async delete(id: number): Promise<boolean> {
    const coleccion = await this.collection();
    const persona = await coleccion.findOne({ "autos._id": id });

    if (!persona) return false;

    const original = persona.autos || [];
    const nuevosAutos = original.filter((a: Auto) => a._id !== id);

    if (nuevosAutos.length === original.length) return false;

    await this.actualizarPersona(persona.id, nuevosAutos);
    return true;
  }
}
