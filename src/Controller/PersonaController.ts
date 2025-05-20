import { Request, Response } from 'express';
import personaService from '../service/personaService';

export const listarP = async (req: Request, res: Response) => {
  const personas = await personaService.listarP();
  res.status(200).json(personas);
};

export const buscarid = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const persona = await personaService.buscarid(id);

  if (!persona) {
    res.status(404).json({ error: 'persona no encontrada' });
    return;
  }
  res.status(200).json(persona);
};

export const addP = async (req: Request, res: Response) => {
  const agregado = await personaService.addP(req.body);

  if (!agregado) {
    res.status(400).json({ error: 'Datos inválidos' });
    return;
  }
  res.status(200).json({ id: agregado });
};

export const edit = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cambios = req.body;

  const editado = await personaService.editP(id, cambios);

  if (!editado) {
    res.status(404).json({ error: 'datos inválidos' });
    return;
  }
  res.status(201).json({ mensaje: 'Persona actualizada correctamente' });
};

export const deleteP = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = await personaService.deleteP(id);

  if (!eliminado) {
    res.status(404).json({ error: 'persona no encontrada' });
    return;
  }
  res.status(201).send();
};

export default {listarP,buscarid,addP,edit,deleteP};