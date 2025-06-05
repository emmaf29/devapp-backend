import { randomUUID } from 'crypto';
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

async findById(id: string): Promise<Persona | null> {
  const coleccion = await this.collection();
  return await coleccion.findOne({ _id: id }) || null;
}

  async save(persona: Persona): Promise<Persona> {
    const coleccion = await this.collection();

    if (!persona._id) {
      persona._id = randomUUID();
    }

    await coleccion.insertOne(persona);
    return persona;
  }

  async update(id: string, actualizada: Persona): Promise<boolean> {
    const coleccion = await this.collection();
    const resultado = await coleccion.replaceOne({ _id: id }, actualizada);
    return resultado.modifiedCount === 1;
  }

  async delete(id: string): Promise<boolean> {
    const coleccion = await this.collection();
    const resultado = await coleccion.deleteOne({_id: id });
    return resultado.deletedCount === 1;
  }
}
