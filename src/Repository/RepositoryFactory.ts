import IRepository from './IRepository';
import Persona from '../modelo/persona';
import StaticPersonaRepository from './local/StaticPersonaRepository';
import StaticAutoRepository from './local/StaticAutoRepository';
import { MongoPersonaRepository } from './mongo/PersonaMongoRepository';
import { MongoAutoRepository } from './mongo/AutoMongoRepository';
import Auto from '../modelo/auto';

let personaRepositoryInstance: IRepository<Persona> | undefined = undefined;
let autoRepositoryInstance: IRepository<Auto> | undefined = undefined;

const RepositoryFactory = {
  personaRepository(): IRepository<Persona> {
    if (!personaRepositoryInstance) {
      personaRepositoryInstance = getPersonaRepositoryByConfiguration();
    }
    return personaRepositoryInstance;
  },

  autoRepository(): IRepository<Auto> {
    if (!autoRepositoryInstance) {
      autoRepositoryInstance = getAutoRepositoryByConfiguration();
    }
    return autoRepositoryInstance;
  }
};

function getPersonaRepositoryByConfiguration(): IRepository<Persona> {
  const tipo = process.env.REPOSITORY?.toLowerCase();
  if (tipo === 'mongodb') return new MongoPersonaRepository();
  return StaticPersonaRepository;
}

function getAutoRepositoryByConfiguration(): IRepository<Auto> {
  const tipo = process.env.REPOSITORY?.toLowerCase();
  if (tipo === 'mongodb') return new MongoAutoRepository();
  return StaticAutoRepository;
}

export default RepositoryFactory;
