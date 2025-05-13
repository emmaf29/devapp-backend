import StaticPersonaRepository from "./StaticPersonaRepository";
import IRepository from "./IRepository";
import Persona from "../modelo/persona";

class RepositoryFactory {
  private static personaRepository: IRepository<Persona>;

  static getPersonaRepository(): IRepository<Persona> {
    if (!this.personaRepository) {
      this.personaRepository = StaticPersonaRepository;
    }
    return this.personaRepository;
  }
}

export default RepositoryFactory;


// te dice cual usar si uno estatico o uno de mongo