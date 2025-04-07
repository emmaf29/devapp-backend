import { Request, Response } from 'express';
import personaService from '../Service/PersonaService';

//browse
export const listarP = (req: Request, res: Response) => {
  const personas = personaService.listarP();
  res.status(200).json(personas);
};
// read
 export const buscarid = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const persona = personaService.buscarid(id);

  if (!persona) {
     res.status(404).json({ error: 'persona no encontrada' });
     return;
  }

    res.status(200).json(persona);
};
//ver bien add
export const agregar = (req: Request, res: Response) => {
  const nuevaPersona = req.body;
  const resultado = personaService.agregar(nuevaPersona);

  if (typeof resultado === 'string') {
   res.status(400).json({ error: resultado });
   return;
  }

   res.status(200).json({ id: resultado });
};

// delete
export const deleteP = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = personaService.deleteP(id);

  if (!eliminado){
    res.status(404).json({error: "persona no encontrada"});
    return;
  }
 res.status(201).send();
};