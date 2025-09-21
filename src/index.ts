import express from "express";
import { config } from "./config/env";
import { testConnection, sequelize } from "./config/database";
import encomiendaRoutes from "./routes/encomienda.routes";
import empresaRoutes from "./routes/empresa.routes";
import usuarioRoutes from "./routes/usuarios.route";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.send("Bienvenido al sistema de envios de SMS");
});
app.use("/", encomiendaRoutes);
app.use("/", empresaRoutes);
app.use("/", usuarioRoutes);

// Levantar servidor
app.listen(config.port, async () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);

    await testConnection();

    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada.");
});