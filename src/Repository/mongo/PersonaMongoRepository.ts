import { ObjectId } from "mongodb";
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
      const last = await coleccion.find().sort({ id: -1 }).limit(1).toArray();
      persona.id = last.length ? last[0].id! + 1 : 1;
    }

    await coleccion.insertOne(persona);
    return persona;
  }

  async update(id: number, cambios: Partial<Persona>): Promise<boolean> {
    const coleccion = await this.collection();
    const res = await coleccion.updateOne({ id }, { $set: cambios });
    return res.modifiedCount > 0;
  }

  async delete(id: number): Promise<boolean> {
    const coleccion = await this.collection();
    const res = await coleccion.deleteOne({ id });
    return res.deletedCount > 0;
  }
}
