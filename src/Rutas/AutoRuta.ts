import { Router } from "express";
import  {listarA, buscarA, addAuto, editAuto, deleteA} from "../Controller/AutoController";

const router = Router();

//browse
router.get('/autos', listarA);
router.get('/autos/:id',buscarA);
router.post('/auto', addAuto);
router.put('/auto/:idDuenio/:patente', editAuto);
router.delete('/autos/:id/:patente', deleteA);

export default router;