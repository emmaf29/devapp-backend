import connectToMongo from "../../coneccion/mongo"
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";
import { Collection } from "mongodb";
import Persona from "../../modelo/persona";
import { randomUUID } from 'crypto';

export class MongoAutoRepository implements IRepository<Auto> {
  private async collection(): Promise<Collection<Persona>> {
    const db = await connectToMongo();
    return db.collection<Persona>("personas");
  }

  async findAll(): Promise<Auto[]> {
    const coleccion = await this.collection();
    const personas = await coleccion.find().toArray();
    return personas.flatMap(p => p.autos || []);
  }

  async findById(id: string): Promise<Auto | null> {
    const autos = await this.findAll();
    return autos.find(a => a._id === id) || null;
  }

  async save(auto: Auto): Promise<Auto> {
    const coleccion = await this.collection();


    const persona = await coleccion.findOne({ _id: auto._idDuenio });
    if (!persona) throw new Error("Persona no encontrada");

    const autos = persona.autos || [];
    autos.push(auto);


    await coleccion.updateOne({ _id: auto._idDuenio }, { $set: { autos } });

    return auto;
  }

  async update(id: string, cambios: Partial<Auto>): Promise<boolean> {
    const coleccion = await this.collection();

    const persona = await coleccion.findOne({ "autos._id": id });
    if (!persona) return false;

    const autos = persona.autos || [];
    const index = autos.findIndex(a => a._id === id);
    if (index === -1) return false;

    autos[index] = { ...autos[index], ...cambios };

    await coleccion.updateOne({ _id: persona._id }, { $set: { autos } });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const coleccion = await this.collection();

    const persona = await coleccion.findOne({ "autos._id": id });
    if (!persona) return false;

    const autos = persona.autos || [];
    const nuevosAutos = autos.filter(a => a._id !== id);

    if (nuevosAutos.length === autos.length) return false;

    await coleccion.updateOne({ _id: persona._id }, { $set: { autos: nuevosAutos } });
    return true;
  }
}
