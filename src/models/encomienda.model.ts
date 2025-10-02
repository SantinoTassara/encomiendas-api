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
    public direccion!: string;
    public estado!: string;
    public correo!: string
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
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refactura: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        empresaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipoTramite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
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
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        tableName: "encomiendas",
        timestamps: true,
    }
);
