import { randomUUID } from 'crypto';
import { Firestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import db from "../../coneccion/Firebase";
import Persona from "../../modelo/persona";
import IRepository from "../IRepository";

export class FirebasePersonaRepository implements IRepository<Persona> {
  private coleccion = collection(db, "personas");

  async findAll(): Promise<Persona[]> {
    const coleccionCompleta = await getDocs(this.coleccion);
    const personas = coleccionCompleta.docs.map(doc => this.convertirFecha(doc.data()));
    return personas;
  }

  async findById(id: string): Promise<Persona | null> {
    const ref = doc(this.coleccion, id);
    const documento = await getDoc(ref);

    if (!documento.exists()) return null;

    return this.convertirFecha(documento.data());
  }

  async save(persona: Persona): Promise<Persona> {
    if (!persona.id) {
      persona.id = randomUUID();
    }
    const ref = doc(this.coleccion, persona.id);
    await setDoc(ref, persona);
    return persona;
  }

  async update(id: string, cambios: Partial<Persona>): Promise<boolean> {
    const ref = doc(this.coleccion, id);
    const documento = await getDoc(ref);
    if (!documento.exists()) return false;

    await updateDoc(ref, cambios);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const ref = doc(this.coleccion, id);
    const documento = await getDoc(ref);
    if (!documento.exists()) return false;

    await deleteDoc(ref);
    return true;
  }

  private convertirFecha(persona: any): Persona {
    if (persona.fechaDeNacimiento?.toDate) {
      persona.fechaDeNacimiento = persona.fechaDeNacimiento.toDate();
    }
    return persona as Persona;
  }
}
