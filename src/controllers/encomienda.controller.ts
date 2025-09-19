import { Request, Response } from "express";
import { Encomienda } from "../models/encomienda.model";
import { transporter } from "../config/mailer";

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

            const info = await transporter.sendMail({
                from: '"Mail Ruta" <mailtester0@gmail.com>',
                to: email,
                subject: "SMSRUTA",
                html:
                    `<h1>Mail tester</h1>`
            });

            res.status(200).json({ message: "Email enviado" });

        } catch (error) {
            res.status(500).json({ message: "Error al enviar el email", error });
        }
    }
}

export default new EncomiendaController();