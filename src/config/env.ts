import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3306,
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
    },
    jwtSecret: process.env.JWT_SECRET || "defaultsecret",
};