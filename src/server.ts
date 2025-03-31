// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import Persona from './Modelo/Persona';
import Auto from './Modelo/Auto';
import { listaPersonas } from './Modelo/Datos';

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


/*const Ferrari: Auto = {
    año: 2003,
    color: 'blanco',
    marca: 'ferrari',
    modelo: 'qsy',
    motor: 'V7',
    patente: 'ABC123',
    numeroDeChasis: '123456'
};
const listaPersonas: Persona[] = [
    {
        id: 1,
        nombre: 'ana',
        apellido: 'diaz',
        dni: '23564897',
        fechaDeNacimiento: new Date(1997, 6, 7),
        genero: 'FEMENINO',
        autos: [Ferrari],
       // esDonante: true, //ver
    },

];*/

app.post('/login',(req, res)=> {
    console.log(req);
    res.json('funciona el login :)');
})

//Browse


// OBTENER PERSONAS
app.get('/personas', (req, res) => {
    const personas= listaPersonas.map(p => ({
        dni: p.dni,
        nombre: p.nombre,
        apellido: p.apellido
    }));

    res.status(200).json(personas);
});

//OBTENER AUTOS
app.get('/autos', (req, res) => {
    const idPersona = req.query.id ? Number(req.query.id) : null;

    let autosList = listaPersonas.flatMap(p =>
        idPersona && p.id === idPersona ? p.autos : (idPersona ? [] : p.autos)
    );

    const autosParciales = autosList.map(a => ({
        marca: a.marca,
        modelo: a.modelo,
        año: a.año,
        patente: a.patente
    }));

    res.status(200).json(autosParciales);
});



//Read

//OBTENER AUTOS POR ID
app.get('/auto/:patente', (req,res)=>{
    const patenteBuscar = req.params.patente;
    const auto = listaPersonas.flatMap(persona =>persona.autos)
                              .find(a=>a.patente === patenteBuscar);
    if(!auto){
        res.status(404).json({ error: "Auto no encontrado" });
    }
    res.status(200).json(auto);

})




//OBTENER PERSONAS POR ID

app.get('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);
    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
      res.status(404).json({error: "persona no encontrada"});
    }

    res.json(persona);
});



















app.get('/', (req, res) => {
    res.json('Hello World');
});

// ...

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});