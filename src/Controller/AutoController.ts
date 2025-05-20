import { Request, Response } from 'express';
import autoService from '../service/autoService';

// browse
export const listarA = async (req: Request, res: Response) => {
  const autos = await autoService.listarA();
  res.status(200).json(autos);
};

// read
export const buscarA = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const auto = await autoService.buscarPorId(id);
  if (!auto) {
    res.status(404).json({ error: 'Auto no encontrado' });
    return;
  }
  res.status(200).json(auto);
};

// add
export const addA = async (req: Request, res: Response) => {
  const agregado = await autoService.agregarA(req.body);
  if (!agregado) {
    res.status(400).json({ error: 'Datos inválidos o patente duplicada' });
    return;
  }
  res.status(201).json({ mensaje: 'Auto agregado correctamente', auto: agregado });
};

// edit
export const editA = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cambios = req.body;
  const editado = await autoService.editA(id, cambios);
  if (!editado) {
    res.status(404).json({ error: 'No se pudo actualizar' });
    return;
  }
  res.status(200).json({ mensaje: 'Auto actualizado correctamente' });
};

// delete
export const deleteA = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = await autoService.deleteA(id);
  if (!eliminado) {
    res.status(404).json({ error: 'Auto no encontrado' });
    return;
  }
  res.status(200).send();
};

export default { listarA, buscarA, addA, editA, deleteA };
