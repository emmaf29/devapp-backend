"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos nuestras dependencias
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const process_1 = __importDefault(require("process"));
// Creamos nuestra app express
const app = (0, express_1.default)();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process_1.default.env.PORT || 9000;
// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
// Mis endpoints van acá
app.get("/", (req, res) => {
    res.json("hello world ");
});
// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
