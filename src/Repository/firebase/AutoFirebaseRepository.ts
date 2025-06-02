import { collection, doc, getDocs, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "../../coneccion/Firebase";
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";
import Persona from "../../modelo/persona";

export class FirebaseAutoRepository implements IRepository<Auto>{
  private coleccion = collection(db, "personas");

  async findAll(): Promise<Auto[]> {
   const collection = await getDocs(this.coleccion);
   const personas = collection.docs.map(d => d.data() as Persona);
   return personas.flatMap(p => p.autos || []);
  }

  async findById(id: number): Promise<Auto | undefined> {
  const autos =  await this.findAll();
  return autos.find(a => a._id === id);
  }

  private generarNuevoId = async (): Promise<number> => {
  const autos = await this.findAll();
  return autos.length ? Math.max(...autos.map(a => a._id ?? 0)) + 1 : 1;
  };

async save(auto: Auto): Promise<Auto> {
    const personaRef = doc(this.coleccion, auto.idDuenio.toString());
    const personaSnap = await getDoc(personaRef);

    if (!personaSnap.exists()) throw new Error("Persona no encontrada");

    const persona = personaSnap.data() as Persona;
    const autos = persona.autos || [];

    auto._id = await this.generarNuevoId();
    autos.push(auto);

    await updateDoc(personaRef, { autos });
    return auto;
  }


  async update(id: number, cambios: Partial<Auto>): Promise<boolean> {
   const personasSnap = await getDocs(this.coleccion);
  for (const doc of personasSnap.docs){
    const persona = doc.data() as Persona;
    const autos = persona.autos || [];
    const index = autos.findIndex(a => a._id === id);

    if (index !== -1){
      autos [index] = {...autos[index], ...cambios};
      await updateDoc(doc.ref, {autos});
      return true;
    }
  }
   return false;
  }


  async delete(id: number): Promise<boolean> {
   const personasSnap = await getDocs(this.coleccion);
   for(const doc of personasSnap.docs){
    const persona = doc.data() as Persona;
    const autos = persona.autos || [];
    const eliminado = autos.filter(a => a._id !== id);

    if (eliminado.length !== autos.length){
      await updateDoc(doc.ref, {autos:eliminado});
      return true;
    }
   }
    return false;
  }
}