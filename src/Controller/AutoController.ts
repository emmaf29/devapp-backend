import { Request, Response, NextFunction } from 'express';
import autoService from '../service/autoService';

// browse
export const listarA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const autos = await autoService.listarA();
    res.status(200).json(autos);
  } catch (error) {
    next(error);
  }
};

// read
export const buscarA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const auto = await autoService.buscarPorId(id);

    if (!auto) {
      res.status(404).json({ error: 'Auto no encontrado' });
      return;
    }

    res.status(200).json(auto);
  } catch (error) {
    next(error);
  }
};

// add
export const addA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resultado = await autoService.agregarA(req.body);

    if (resultado === null) {
      res.status(400).json({ error: 'Datos inválidos' });
      return;
    }

    if (resultado === false) {
      res.status(409).json({ error: 'Patente duplicada' });
      return;
    }

    res.status(201).json({ mensaje: 'Auto agregado correctamente', auto: resultado });
  } catch (error) {
    next(error);
  }
};

// edit
export const editA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const cambios = req.body;

    const editado = await autoService.editA(id, cambios);

    if (!editado) {
      res.status(404).json({ error: 'No se pudo actualizar' });
      return;
    }

    res.status(200).json({ mensaje: 'Auto actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// delete
export const deleteA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const eliminado = await autoService.deleteA(id);

    if (!eliminado) {
      res.status(404).json({ error: 'Auto no encontrado' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { listarA, buscarA, addA, editA, deleteA };
