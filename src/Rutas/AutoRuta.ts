import { Router } from "express";
import  {listarA, buscarA, addAuto, editA, deleteA} from "../controller/autoController";

const router = Router();

//browse
router.get('/autos', listarA);
router.get('/autos/:id', buscarA);
router.post('/auto', addAuto);
router.put('/auto/:id', editA);
router.delete('/autos/:id', deleteA);

export default router;