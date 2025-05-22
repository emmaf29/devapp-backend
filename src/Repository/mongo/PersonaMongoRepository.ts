// src/repository/mongo/MongoPersonaRepository.ts
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
    const col = await this.collection();
    return await col.find().toArray();
  }

  async findById(id: number): Promise<Persona | undefined> {
    const col = await this.collection();
    return await col.findOne({ id }) ?? undefined;
  }

  async save(persona: Persona): Promise<Persona> {
    const col = await this.collection();

    // Generar un ID incremental (campo id, no el _id de Mongo)
    if (!persona.id) {
      const last = await col.find().sort({ id: -1 }).limit(1).toArray();
      persona.id = last.length ? last[0].id! + 1 : 1;
    }

    await col.insertOne(persona);
    return persona;
  }

  async update(id: number, cambios: Partial<Persona>): Promise<boolean> {
    const col = await this.collection();
    const res = await col.updateOne({ id }, { $set: cambios });
    return res.modifiedCount > 0;
  }

  async delete(id: number): Promise<boolean> {
    const col = await this.collection();
    const res = await col.deleteOne({ id });
    return res.deletedCount > 0;
  }
}
