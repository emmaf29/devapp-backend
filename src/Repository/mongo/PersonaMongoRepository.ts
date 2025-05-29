import connectToMongo from "../../coneccion/mongo";
import Persona from "../../modelo/persona";
import IRepository from "../IRepository";

export class MongoPersonaRepository implements IRepository<Persona> {
  private async collection() {
    const db = await connectToMongo();
    return db.collection<Persona>("personas");
  }

  async findAll(): Promise<Persona[]> {
    const coleccion = await this.collection();
    return await coleccion.find().toArray();
  }

  async findById(id: number): Promise<Persona | undefined> {
    const coleccion = await this.collection();
    return await coleccion.findOne({ id }) ?? undefined;
  }

    async save(persona: Persona): Promise<Persona> {
    const coleccion = await this.collection();


    if (!persona.id) {
      const personas = await coleccion.find().toArray();
      const maxId = personas.length ? Math.max(...personas.map(p => p.id ?? 0)) : 0;
      persona.id = maxId + 1;
    }

    await coleccion.insertOne(persona);
    return persona;

  }

async update(id: number, actualizada: Persona): Promise<boolean> {
  const coleccion = await this.collection();
  const resultado = await coleccion.replaceOne({ id }, actualizada);
  return resultado.modifiedCount === 1;
}

  async delete(id: number): Promise<boolean> {
    const coleccion = await this.collection();
    const resultado = await coleccion.deleteOne({ id });
    return resultado.deletedCount === 1;
  }
}