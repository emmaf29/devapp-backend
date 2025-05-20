import { Router } from 'express';
import { listarP, buscarid, addP, edit, deleteP } from '../controller/personaController';

const router = Router();

router.get('/persona', listarP);
router.get('/personas/:id', buscarid);
router.post('/persona', addP);
router.put('/persona/:id', edit);
router.delete('/persona/:id',deleteP);

export default router;
