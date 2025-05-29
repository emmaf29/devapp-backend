import { Firestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../../coneccion/Firebase";
import Persona from "../../modelo/persona";
import IRepository from "../IRepository";

export class FirebasePersonaRepository implements IRepository<Persona>{
private coleccion = collection(db, "personas");

async findAll(): Promise<Persona[]> {
   const coleccionCompleta = await getDocs(this.coleccion);
   const personas = coleccionCompleta.docs.map(doc => doc.data() as Persona);
   return personas;
}


async findById(id: number): Promise<Persona | undefined> {
    const ref = doc(this.coleccion, id.toString());
    const documento = await getDoc(ref);

    if(!documento.exists()) return undefined;

    const datos = documento.data();
    return datos as Persona;
}


async save(persona: Persona): Promise<Persona> {
    if(!persona.id){
     const todasPersonas = await this.findAll();
     const maxId = todasPersonas.length >0 ?Math.max(...todasPersonas.map(p => p.id ?? 0)) : 0;
     persona.id = maxId + 1;
     }
    const ref = doc(this.coleccion, persona.id.toString());
    await setDoc(ref, persona);
    return persona;
    }



    update(id: number, cambios: Partial<Persona>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}
