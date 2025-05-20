import IRepository from "./IRepository";
import Persona from "../modelo/persona";
import Auto from "../modelo/auto";

import StaticPersonaRepository from "./StaticPersonaRepository";
import StaticAutoRepository from "./StaticAutoRepository";

class RepositoryFactory {
  private static personaRepository: IRepository<Persona>;
  private static autoRepository: IRepository<Auto>;

  static getPersonaRepository(): IRepository<Persona> {
    if (!this.personaRepository) {
      this.personaRepository = StaticPersonaRepository;
    }
    return this.personaRepository;
  }

  static getAutoRepository(): IRepository<Auto> {
    if (!this.autoRepository) {
      this.autoRepository = StaticAutoRepository;
    }
    return this.autoRepository;
  }
}

export default RepositoryFactory;



