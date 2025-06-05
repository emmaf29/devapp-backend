import Auto from "../../modelo/auto";

const Ferrari: Auto = {
  _id: "uuid-auto-1",
  _idDuenio: "uuid-ana",
  anio: 2003,
  color: "Blanco",
  marca: "Ferrari",
  modelo: "QSY",
  motor: "V7",
  patente: "ABC123",
  numeroDeChasis: "123456"
};

const ToyotaCorolla: Auto = {
  _id: "uuid-auto-2",
  _idDuenio: "uuid-carlos",
  anio: 2020,
  color: "Gris",
  marca: "Toyota",
  modelo: "Corolla",
  motor: "V4",
  patente: "XYZ789",
  numeroDeChasis: "654321"
};

const FordFiesta: Auto = {
  _id: "uuid-auto-3",
  _idDuenio: "uuid-carlos",
  anio: 2019,
  color: "Rojo",
  marca: "Ford",
  modelo: "Fiesta",
  motor: "V4",
  patente: "LMN456",
  numeroDeChasis: "789123"
};

const ChevroletCruze: Auto = {
  _id: "uuid-auto-4",
  _idDuenio: "uuid-lucia",
  anio: 2022,
  color: "Negro",
  marca: "Chevrolet",
  modelo: "Cruze",
  motor: "V6",
  patente: "PQR678",
  numeroDeChasis: "321654"
};

const BMWX5: Auto = {
  _id: "uuid-auto-5",
  _idDuenio: "uuid-mariana",
  anio: 2023,
  color: "Azul",
  marca: "BMW",
  modelo: "X5",
  motor: "V8",
  patente: "DEF999",
  numeroDeChasis: "987654"
};

export { Ferrari, ToyotaCorolla, FordFiesta, ChevroletCruze, BMWX5 };
