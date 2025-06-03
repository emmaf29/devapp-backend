import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: 'Ocurrió un error',
    message: err.message || 'Error interno del servidor'
  });
}
