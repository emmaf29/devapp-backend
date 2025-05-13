import { Request, Response } from 'express';
import personaService from '../service/personaService';

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

// add
export const addP = (req: Request, res: Response) => {
  const agregado = personaService.addP(req.body);

  if (!agregado) {
    res.status(400).json({ error: 'Datos inválidos' });
    return;
  }
  res.status(200).json({ id: agregado });
};

//edit
export const editP = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cambios = req.body;

  const editado = personaService.editP(id, cambios);

  if (!editado) {
    res.status(404).json({ error: 'datos inválidos' });
    return;
  }
  res.status(201).json({ mensaje: 'Persona actualizada correctamente' });
};

// delete
export const deleteP = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = personaService.deleteP(id);

  if (!eliminado) {
    res.status(404).json({ error: 'persona no encontrada' });
    return;
  }
  res.status(201).send();
};

export default { listarP, buscarid, addP, editP, deleteP };