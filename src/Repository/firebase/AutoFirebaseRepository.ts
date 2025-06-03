import { collection, doc, getDocs, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "../../coneccion/Firebase";
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";
import Persona from "../../modelo/persona";
import { randomUUID } from "crypto";


export class FirebaseAutoRepository implements IRepository<Auto>{
  private coleccion = collection(db, "personas");

  async findAll(): Promise<Auto[]> {
   const collection = await getDocs(this.coleccion);
   const personas = collection.docs.map(d => d.data() as Persona);
   return personas.flatMap(p => p.autos || []);
  }

  async findById(id: string): Promise<Auto | null> {
  const autos =  await this.findAll();
  return autos.find(a => a._id === id) || null;
  }



  async save(auto: Auto): Promise<Auto> {
    const personaRef = doc(this.coleccion, auto.idDuenio);
    const personaSnap = await getDoc(personaRef);

    if (!personaSnap.exists()) throw new Error("Persona no encontrada");

    const persona = personaSnap.data() as Persona;
    const autos = persona.autos || [];

    auto._id = randomUUID();
    autos.push(auto);

    await updateDoc(personaRef, { autos });
    return auto;
  }


  async update(id: string, cambios: Partial<Auto>): Promise<boolean> {
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


  async delete(id: string): Promise<boolean> {
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