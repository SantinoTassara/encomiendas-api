import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public usuario!: string;
    public correo!: string;
    public password!: string
}

Usuario.init(
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
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: false,
    }
)