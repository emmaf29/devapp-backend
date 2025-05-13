import { Router } from 'express';
import { listarP, buscarid, addP, editP, deleteP } from '../controller/personaController';

const router = Router();

router.get('/persona', listarP);
router.get('/personas/:id', buscarid);
router.post('/persona', addP);
router.put('/persona/:id', editP);
router.delete('/persona/:id',deleteP);

export default router;
