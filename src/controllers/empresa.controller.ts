import { Request, Response } from "express";
import { Empresa } from "../models/empresa.model";

export class EmpresaController {
    public async getEmpresas(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findAll();
            if (!empresas) {
                res.status(404).json({ message: "No se encontraron empresas" });
                return;
            }
            res.status(200).json(empresas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las empresas", error });
        }
    }
    public async createEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, correos, direcciones } = req.body;
            const newEmpresa = await Empresa.create({ nombre, correos, direcciones });
            res.status(201).json(newEmpresa);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la empresa", error });
        }
    }

    public async deleteEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await Empresa.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ message: "Empresa eliminada" });
            } else {
                res.status(404).json({ message: "Empresa no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la empresa", error });
        }
    }

}
export default new EmpresaController();
