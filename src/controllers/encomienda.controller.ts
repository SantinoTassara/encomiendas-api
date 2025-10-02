import { Request, Response } from "express";
import { Encomienda } from "../models/encomienda.model";
import { transporter } from "../config/mailer";
import { where } from "sequelize";

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
            const { fecha, sector, usuarioId, refactura, tipoTramite, descripcion, direccion, estado, correo } = req.body;
            const newEncomienda = await Encomienda.create({ fecha, sector, usuarioId, refactura, tipoTramite, descripcion, direccion, estado, correo });
            res.status(201).json(newEncomienda);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la encomienda", error });
        }
    }


    //soft delete
    public async deleteEncomienda(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const ruta = await Encomienda.findOne({ where: { id } });
            if (!ruta) {
                res.status(404).json({ message: "La Ruta de envio no existe" });
                return;
            }

            Encomienda.update({ estado: "Eliminado" }, { where: { id } });
            res.status(200).json({ message: "Ruta eliminada" });



        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la encomienda", error });
        }
    }

    async envioEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const { contenido, asunto } = req.body

            const info = await transporter.sendMail({
                from: '"Mail Ruta" <mailtester0@gmail.com>',
                to: email,
                subject: asunto,
                html:
                    `${contenido}`
            });

            res.status(200).json({ message: "Email enviado" });

        } catch (error) {
            res.status(500).json({ message: "Error al enviar el email", error });
        }
    }

    public async cambiarEstado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { estado } = req.params

            const ruta = await Encomienda.findOne({ where: { id } })
            if (!ruta) {
                res.status(404).json({ message: "La ruta no existe" })
            }
            await Encomienda.update({ estado }, { where: { id } })
            res.status(200).json({ message: "Estado actualizado" })

        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el estado", error });
        }
    }

    public async paqueteEnviado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const ruta = await Encomienda.findOne({ where: { id } })

            if (!ruta) {
                res.status(404).json({ message: "La ruta no existe..." })
            }

            const contenido = "El Pedido esta en viaje, Esperamos su confirmacion de entrega"

            await Encomienda.update({ estado: "Enviado" }, { where: { id } })
            await this.envioEmail(
                { ...req, body: { email: ruta?.correo, contenido, asunto: "El Pedido Fue Enviado" } } as Request,
                res
            );

            res.status(200).json({ message: "Estado cambiado a enviado y email enviado" })

        } catch (error) {
            res.status(500).json({ message: "Error al cambiar de estado a enviado" })
        }

    }
}
export default new EncomiendaController();