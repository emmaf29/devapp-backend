import { Request, Response } from 'express';
import autoService from '../service/autoService';

//browse
export const listarA = (req: Request, res: Response) => {
   const id = req.query.idDuenio? Number(req.query.idDuenio) : undefined;
   const autos = autoService.listarA(id);
   res.status(200).json(autos);
};

//read

export const buscarA = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const auto = autoService.buscarPorId(id);

  if (!auto) {
    res.status(404).json({ error: 'Auto no encontrado' });
    return;
  }

  res.status(200).json(auto);
};

//add
export const addAuto = (req: Request, res: Response) => {
   const agregado = autoService.agregarA(req.body.idDuenio, req.body);

   if (!agregado) {
     res.status(400).json({ error: 'Datos inválidos o patente duplicada' });
     return;
   }

   res.status(201).json({ mensaje: 'Auto agregado correctamente' });
 };

// edit
export const editA = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cambios = req.body;

  const editado = autoService.editA(id, cambios);

  if (!editado) {
    res.status(404).json({ error: 'datos inválidos' });
    return;
  }

  res.status(201).json({ mensaje: 'Auto actualizado correctamente' });
};


 //delete
 export const deleteA = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const eliminado = autoService.deleteA(id);

  if (!eliminado) {
    res.status(404).json({ error: 'Auto no encontrado' });
    return;
  }

  res.status(201).send();
};