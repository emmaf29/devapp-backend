// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import Persona from './Modelo/Persona';
import Auto from './Modelo/Auto';
import { Request, Response } from 'express';
import { listarP, buscarid, agregar, deleteP } from './Controller/PersonaController';
import {listarA} from './Controller/AutoController';


//import personaRuta from './Rutas/PersonaRuta';
//import autoRuta from './Rutas/AutoRuta';




// Creamos nuestra app express
const app = express();

// Leemos el puerto de las variables de entorno,
// si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());


// Mis endpoints van acá

app.post('/login',(req, res)=> {
    console.log(req);
    res.json('funciona el login :)');
})

//perosna
//app.use('/', personaRuta);
app.get('/persona', listarP);
app.get('/personas/:id', buscarid);
app.post('/peronas', agregar);
app.delete('/persona/:id',deleteP);


//autos
//app.use('/', autoRuta);
app.get('/autos', listarA);



app.get('/', (req, res) => {
    res.json('Hello World');
});

// ...

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});