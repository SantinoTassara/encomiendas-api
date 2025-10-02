import { Router, Request, Response } from "express";
import EmpresaController from "../controllers/empresa.controller";

const router = Router();

router.get("/empresas", (req: Request, res: Response) => EmpresaController.getEmpresas(req, res));
router.get("/empresas/active", (req: Request, res: Response) => EmpresaController.getOnlyActive(req, res));
router.get("/empresas/:nombre", (req: Request, res: Response) => EmpresaController.getEmpresaByNomre(req, res));
router.post("/empresas", (req: Request, res: Response) => EmpresaController.createEmpresa(req, res));
router.delete("/empresas/:id", (req: Request, res: Response) => EmpresaController.deleteEmpresa(req, res));
router.put("/empresas/:id", (req: Request, res: Response) => EmpresaController.reactivarEmpresa(req, res));

export default router;