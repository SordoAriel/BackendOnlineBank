import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "./database.js";
import usersRoutes from "@routes/usersRoutes";
import transfersRoutes from "@routes/transfersRoutes";

export const createServer = (): express.Application => {
    const app = express();

    app.use(
        express.urlencoded({ extended: true }),
        express.json(),
        cors({ credentials: true }),
        bodyParser.json(),
        compression(),
        cookieParser()
    );

    app.disable("x-powered-by");

    app.use("/api/auth", usersRoutes);
    app.use("/api/transfers", transfersRoutes);

    return app;
};
