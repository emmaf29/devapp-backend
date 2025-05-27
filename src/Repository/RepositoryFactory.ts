import process from 'process';
import IRepository from './IRepository';
import Persona from '../modelo/persona';
import Auto from '../modelo/auto';
import StaticPersonaRepository from './local/StaticPersonaRepository';
import StaticAutoRepository from './local/StaticAutoRepository';
import { MongoPersonaRepository } from './mongo/PersonaMongoRepository';
import { MongoAutoRepository } from './mongo/AutoMongoRepository';
import { FirebasePersonaRepository } from './firebase/PersonaFirebaseRepository';
import { FirebaseAutoRepository } from './firebase/PersonaFirebaseRepository';



export abstract class RepositoryFactory {
  private static personaRepositorySingletonInstance: IRepository<Persona> | undefined = undefined;
  private static autoRepositorySingletonInstance: IRepository<Auto> | undefined = undefined;

  public static personaRepository(): IRepository<Persona> {
    if (!RepositoryFactory.personaRepositorySingletonInstance) {
      RepositoryFactory.personaRepositorySingletonInstance =
        RepositoryFactory.getPersonaRepositoryByConfiguration();
    }
    return RepositoryFactory.personaRepositorySingletonInstance;
  }

  public static autoRepository(): IRepository<Auto> {
    if (!RepositoryFactory.autoRepositorySingletonInstance) {
      RepositoryFactory.autoRepositorySingletonInstance =
        RepositoryFactory.getAutoRepositoryByConfiguration();
    }
    return RepositoryFactory.autoRepositorySingletonInstance;
  }

  private static getPersonaRepositoryByConfiguration(): IRepository<Persona> {
    const tipo = process.env.REPOSITORY;

    if (tipo === 'mongodb') {
      return new MongoPersonaRepository();
    }

    if (tipo === 'firebase') {
      return new FirebasePersonaRepository();
    }

    return StaticPersonaRepository;
  }

  private static getAutoRepositoryByConfiguration(): IRepository<Auto> {
    const tipo = process.env.REPOSITORY;

    if (tipo === 'mongodb') {
      return new MongoAutoRepository();
    }

    if (tipo === 'firebase') {
      return new FirebaseAutoRepository();
    }

    return StaticAutoRepository;
  }
}
