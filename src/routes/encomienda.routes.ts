import { Router, Request, Response } from "express";
import EncomiendaController from "../controllers/encomienda.controller";

const router = Router();

//rutas de encomiendas (Faltan varias y sumar validaciones)
router.get("/encomiendas", (req: Request, res: Response) => EncomiendaController.getEncomiendas(req, res));
router.post("/encomiendas", (req: Request, res: Response) => EncomiendaController.createEncomienda(req, res));
router.delete("/encomiendas/:id", (req: Request, res: Response) => EncomiendaController.deleteEncomienda(req, res));
router.post("/encomiendas/envioEmail", (req: Request, res: Response) => EncomiendaController.envioEmail(req, res));


export default router;