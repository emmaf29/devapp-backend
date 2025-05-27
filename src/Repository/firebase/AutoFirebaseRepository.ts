import { Firestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../../coneccion/Firebase";
import Auto from "../../modelo/auto";
import IRepository from "../IRepository";

export class FirebaseAutoRepository implements IRepository<Auto>{
    findAll(): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Auto | undefined> {
        throw new Error("Method not implemented.");
    }
    save(entidad: Auto): Promise<Auto> {
        throw new Error("Method not implemented.");
    }
    update(id: number, cambios: Partial<Auto>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}