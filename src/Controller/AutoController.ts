import { Request, Response } from 'express';
import AutoService from '../Service/AutoService';

//browse
export const listarA = (req: Request, res: Response) => {
   const id = req.query.id? Number(req.query.id) : undefined;
   const autos = AutoService.listarA(id);
   res.status(200).json(autos);
};

//read

export const buscarA = (req: Request, res: Response) => {
   const id = Number(req.params.id);
   const auto = AutoService.buscarIdDuenio(id);

   if (!auto) {
      res.status(404).json({ error: 'Auto no encontrado' });
      return;
   }
    res.status(200).json(auto);
 };

//add
export const addAuto = (req: Request, res: Response) => {
   const agregado = AutoService.agregarA(req.body.idDuenio, req.body);

   if (!agregado) {
     res.status(400).json({ error: 'Datos inválidos o patente duplicada' });
     return;
   }

   res.status(201).json({ mensaje: 'Auto agregado correctamente' });
 };

// edit
export const editAuto = (req: Request, res: Response) => {
   const idDuenio = Number(req.params.idDuenio);
   const patente = req.params.patente;
   const cambios = req.body;

   const editado = AutoService.editA(idDuenio, patente, cambios);

   if (!editado) {
     res.status(404).json({ error: 'datos invalidos' });
     return;
   }
   res.status(200).json({ mensaje: 'Auto actualizado correctamente' });
 };


 //delete
 export const deleteA = (req: Request, res: Response) => {
   const idDuenio = Number(req.params.id);
   const patente = req.params.patente;

   const eliminado = AutoService.deleteA(idDuenio, patente);

   if (!eliminado) {
     res.status(404).json({ error: "Auto no encontrado" });
     return;
   }
   res.status(200).json({ mensaje: "Auto eliminado correctamente" });
 };
