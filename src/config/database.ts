import { Sequelize } from "sequelize";
import { config } from "./env";

export const sequelize = new Sequelize(
    "encomiendas_db",                // Nombre de la DB
    config.db.user,                  // Usuario
    config.db.password,              // Contraseña
    {
        host: config.db.host,
        dialect: "mysql",
        logging: false,                // Quita logs de SQL (opcional)
    }
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