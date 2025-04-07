import { Request, Response } from 'express';
import AutoService from '../Service/AutoService';

//browse
export const listarA = (req: Request, res: Response) => {
   const id = req.query.id? Number(req.query.id) : undefined;
   const autos = AutoService.listarA(id);
   res.status(200).json(autos);
};

