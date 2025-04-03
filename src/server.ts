// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import Persona from './Modelo/Persona';
import Auto from './Modelo/Auto';
import { listaPersonas } from './Modelo/Datos';
import { Request, Response } from 'express';


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

//Browse


// OBTENER PERSONAS
app.get('/personas', (req, res) => {
    const personas= listaPersonas.map(p => ({
        id : p.id,
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
        idDuenio: a.idDuenio,
        marca: a.marca,
        modelo: a.modelo,
        año: a.anio,
        patente: a.patente
    }));

    res.status(200).json(autosParciales);

});



//Read

//OBTENER AUTOS POR PATENTE
/*app.get('/auto/:patente', (req,res) => {
    const patenteBuscar = req.params.patente;
    const auto = listaPersonas.flatMap(persona =>persona.autos)
                              .find(a=>a.patente === patenteBuscar);
    if(!auto){
      res.status(404).json({ error: "Auto no encontrado" });
      return;
    }
    res.status(200).json(auto);

})

*/


//OBTENER PERSONAS POR ID CON SU AUTO

app.get('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);
    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
      res.status(404).json({error: "persona no encontrada"});
      return;
    }

    res.json(persona);
});


//edit




//-----------------------------------------------------------------------------------------//


//add agrega una persona y devuelve su id nuevo
app.post('/personaNueva', (req, res)=>{
    const {nombre,apellido,dni,fechaDeNacimiento,genero,esDonante} = req.body;

    if(!nombre ||!apellido || !dni || !fechaDeNacimiento || !genero){
     res.status(400).json({error: "datos invalidos"});
     return;
    }

   const nuevaPersona: Persona = {
    id:listaPersonas.length +1,
    nombre,
    apellido,
    dni,
    fechaDeNacimiento: new Date (fechaDeNacimiento),
    genero,
    autos:[],
    esDonante
   };

   listaPersonas.push(nuevaPersona);
   res.status(200).json({id:nuevaPersona.id});

});






















//Delete
app.delete('/persona/:id', (req, res) =>{
    const idPersona = Number(req.params.id);
    const index = listaPersonas.findIndex((p) => p.id === idPersona);

    if(index === -1){
        res.status(404).json({error : "persona no encontrada"});
        return;
    }
   listaPersonas.splice(index,1);
   res.status(201).send();

});






















app.get('/', (req, res) => {
    res.json('Hello World');
});

// ...

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});