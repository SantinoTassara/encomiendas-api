import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Empresa } from "./empresa.model";

export class Encomienda extends Model {
    public id!: number;
    public fecha!: Date;
    public sector!: string;
    public usuarioId!: number;
    public refactura?: boolean;
    public empresaId!: number;
    public tipoTramite!: string;
    public descripcion!: string;
    public estado!: string;
}

Encomienda.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuarioCarga: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refactura: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        clienteRefactura: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tipoTramite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcionTramite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pendiente",
        },
    },
    {
        sequelize,
        tableName: "encomiendas",
        timestamps: true,
    }
);
