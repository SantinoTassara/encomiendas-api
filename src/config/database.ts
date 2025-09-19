import { Sequelize } from "sequelize";
import { config } from "./env";

export const sequelize = new Sequelize(
    "encomiendas_db",
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: "mysql",
        logging: false,
        dialectOptions: {
            ssl: false
        }
    },
);

// Probar conexión
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos exitosa.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
};