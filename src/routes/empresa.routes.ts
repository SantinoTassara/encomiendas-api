import { Router, Request, Response } from "express";
import EmpresaController from "../controllers/empresa.controller";

const router = Router();

router.get("/empresas", (req: Request, res: Response) => EmpresaController.getEmpresas(req, res));
router.post("/empresas", (req: Request, res: Response) => EmpresaController.createEmpresa(req, res));
router.delete("/empresas/:id", (req: Request, res: Response) => EmpresaController.deleteEmpresa(req, res));

export default router;