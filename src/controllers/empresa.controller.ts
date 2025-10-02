import { Request, Response } from "express";
import { Empresa } from "../models/empresa.model";

export class EmpresaController {

    //getters
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

    public async getOnlyActive(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findAll({ where: { estado: "Activo" } });
            if (!empresas) {
                res.status(404).json({ message: "No se encontraron empresas activas" });
                return;
            }
            res.status(200).json(empresas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las empresas activas", error });
        }
    }

    public async getEmpresaByNomre(req: Request, res: Response): Promise<void> {
        try {
            const { nombre } = req.params
            const empresa = await Empresa.findOne({ where: { nombre } })
            if (!empresa) {
                res.status(404).json({ message: "La empresa no fue encontrada" })
            }
            res.status(200).json(empresa)
        } catch (error) {
            res.status(500).json({ message: "Error al buscar empresa", error });
        };
    }

    //setters
    public async createEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, direcciones } = req.body;
            const newEmpresa = await Empresa.create({ nombre, direcciones });
            res.status(201).json(newEmpresa);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la empresa", error });
        }
    }

    //soft delete
    public async deleteEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findOne({ where: { id } });
            if (!empresa || empresa.estado === "Baja") {
                res.status(404).json({ message: "La empresa no esta activa" });
                return;
            }

            Empresa.update({ estado: "Baja" }, { where: { id } });
            res.status(200).json({ message: "Empresa eliminada" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la empresa", error });
        }
    }

    public async reactivarEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findOne({ where: { id } });
            if (!empresa || empresa.estado === "Activo") {
                res.status(404).json({ message: "La empresa ya esta activa" });
                return;
            }
            Empresa.update({ estado: "Activo" }, { where: { id } });
            res.status(200).json({ message: "Empresa reactivada" });
        } catch (error) {
            res.status(500).json({ message: "Error al reactivar la empresa", error });
        }
    }




}
export default new EmpresaController();
