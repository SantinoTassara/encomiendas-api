import { Request, Response } from "express";
import { Encomienda } from "../models/encomienda.model";

export class EncomiendaController {
    public async getEncomiendas(req: Request, res: Response): Promise<void> {
        try {
            const encomiendas = await Encomienda.findAll();
            if (!encomiendas) {
                res.status(404).json({ message: "No se encontraron encomiendas" });
                return;
            }
            res.status(200).json(encomiendas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las encomiendas", error });
        }

    }

    public async createEncomienda(req: Request, res: Response): Promise<void> {
        try {
            const { fecha, sector, usuarioCarga, refactura, clienteRefactura, tipoTramite, descripcionTramite, direccion, estado } = req.body;
            const newEncomienda = await Encomienda.create({ fecha, sector, usuarioCarga, refactura, clienteRefactura, tipoTramite, descripcionTramite, direccion, estado });
            res.status(201).json(newEncomienda);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la encomienda", error });
        }
    }


    //MAS ADELANTE CONVERTIR ESTE DELETE EN SOFT DELETE
    public async deleteEncomienda(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await Encomienda.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ message: "Encomienda eliminada" });
            } else {
                res.status(404).json({ message: "Encomienda no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la encomienda", error });
        }
    }

    async envioEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            if (!autenticacionUsuario) {
                res.status(404).render("login", {
                    mostrarModal: true,
                    modalTitle: "Recuperar contraseña",
                    modalMessage: "Usuario no encontrado"
                });
                return
            }
        }
export default new EncomiendaController();