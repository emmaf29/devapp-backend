import { Request, Response, NextFunction } from 'express';
import personaService from '../service/personaService';

export const listarP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const personas = await personaService.listarP();
    res.status(200).json(personas);
  } catch (error) {
    next(error);
  }
};

export const buscarid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const persona = await personaService.buscarid(id);

    if (!persona) {
      res.status(404).json({ error: 'Persona no encontrada' });
      return;
    }

    res.status(200).json(persona);
  } catch (error) {
    next(error);
  }
};

export const addP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agregado = await personaService.addP(req.body);

    if (!agregado) {
      res.status(400).json({ error: 'Datos inválidos' });
      return;
    }

    res.status(201).json({ id: agregado });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const cambios = req.body;

    const resultado = await personaService.editP(id, cambios);

    if (resultado === null) {
      res.status(400).json({ error: "Datos inválidos" });
      return;
    }

    if (resultado === false) {
      res.status(404).json({ error: "Persona no encontrada" });
      return;
    }

    res.status(200).json({ mensaje: "Persona actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};


export const deleteP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const eliminado = await personaService.deleteP(id);

    if (!eliminado) {
      res.status(404).json({ error: 'Persona no encontrada' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { listarP, buscarid, addP, edit, deleteP };
