// src/repository/mongo/MongoAutoRepository.ts
import connectToMongo from "../../coneccion/mongo"
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";

export class MongoAutoRepository implements IRepository<Auto> {
  private async collection() {
    const db = await connectToMongo();
    return db.collection("personas");
  }

  async findAll(): Promise<Auto[]> {
    const col = await this.collection();
    const personas = await col.find().toArray();
    return personas.flatMap((p: any) => p.autos ?? []);
  }

  async findById(id: number): Promise<Auto | undefined> {
    const autos = await this.findAll();
    return autos.find(a => a._id === id);
  }

  async save(auto: Auto): Promise<Auto> {
  const col = await this.collection();
  const persona = await col.findOne({ id: auto.idDuenio });

  if (!persona) throw new Error("Persona no encontrada");

  console.log("Auto recibido para guardar:", auto);

  if (!auto._id) {
    const todos = await this.findAll();
    const maxId = todos.length ? Math.max(...todos.map(a => a._id ?? 0)) : 0;
    auto._id = maxId + 1;
    console.log("ID asignado al auto:", auto._id);
  }

  const autos = persona.autos ?? [];
  const index = autos.findIndex((a: Auto) => a._id === auto._id);
  if (index !== -1) {
    autos[index] = auto;
  } else {
    autos.push(auto);
  }

  await col.updateOne({ id: auto.idDuenio }, { $set: { autos } });
  return auto;
}

  async update(id: number, cambios: Partial<Auto>): Promise<boolean> {
    const col = await this.collection();
    const personas = await col.find().toArray();

    for (const persona of personas) {
      const autos = persona.autos ?? [];
      const auto = autos.find((a: Auto) => a._id === id);
      if (auto) {
        Object.assign(auto, cambios);
        await col.updateOne({ id: persona.id }, { $set: { autos } });
        return true;
      }
    }
    return false;
  }

  async delete(id: number): Promise<boolean> {
    const col = await this.collection();
    const personas = await col.find().toArray();

    for (const persona of personas) {
      const original = persona.autos ?? [];
      const nuevosAutos = original.filter((a: Auto) => a._id !== id);
      if (nuevosAutos.length < original.length) {
        await col.updateOne({ id: persona.id }, { $set: { autos: nuevosAutos } });
        return true;
      }
    }
    return false;
  }
}
