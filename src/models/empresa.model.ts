import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Empresa extends Model {
    public id!: number;
    public nombre!: string;
    public direcciones!: string;
    public estado!: string;
}

Empresa.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direcciones: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Activo"
        }
    },
    {
        sequelize,
        tableName: "empresas",
        timestamps: false,
    }
)
