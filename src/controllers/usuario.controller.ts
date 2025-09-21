import { Request, Response } from "express";
import { Usuario } from "../models/usuario.model";

export class UsuarioController {
    public async getUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await Usuario.findAll();
            if (!usuarios) {
                res.status(404).json({ message: "No se encontraron usuarios" });
                return;
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los usuarios", error });
        }
    }
    public async createUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, email, password, rol } = req.body;
            const newUsuario = await Usuario.create({ nombre, email, password, rol });
            res.status(201).json(newUsuario);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el usuario", error });
        }
    }
    public async deleteUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await Usuario.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ message: "Usuario eliminado" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el usuario", error });
        }

    }
    public async getUsuarioById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const usuario = await Usuario.findOne({ where: { id } })
            if (!usuario) {
                res.status(404).json({ message: "El usuario no fue encontrado" })
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ message: "Error al buscar usuario", error });

        };
    }
}