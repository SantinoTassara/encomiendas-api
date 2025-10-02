import { Sequelize } from "sequelize";
import { config } from "./config/env";
import { Encomienda } from "./models/encomienda.model";

const setup = async () => {
    try {
        const sequelizeAdmin = new Sequelize("", config.db.user, config.db.password, {
            host: config.db.host,
            dialect: "mysql",
            logging: false,
            dialectOptions: {
                ssl: false
            }
        });

        await sequelizeAdmin.query(`CREATE DATABASE IF NOT EXISTS encomiendas_db;`);
        console.log("Base de datos comprobada/creada");

        await Encomienda.sequelize?.authenticate();
        console.log("Conectado a la DB encomiendas_db");

        await Encomienda.sequelize?.sync({ alter: true });
        console.log("Modelos sincronizados con la base de datos");

        process.exit(0);
    } catch (error) {
        console.error("Error durante el setup:", error);
        process.exit(1);
    }
};

setup();
