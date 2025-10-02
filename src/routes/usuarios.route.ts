import { Router, Request, Response } from "express";
import UsuarioController from "../controllers/usuario.controller";

const router = Router();

router.get("/usuarios", (req: Request, res: Response) => UsuarioController.getUsuarios(req, res));
router.post("/usuarios", (req: Request, res: Response) => UsuarioController.createUsuario(req, res));
router.delete("/usuarios/:id", (req: Request, res: Response) => UsuarioController.deleteUsuario(req, res));
router.get("/usuarios/:id", (req: Request, res: Response) => UsuarioController.getUsuarioById(req, res));

export default router;