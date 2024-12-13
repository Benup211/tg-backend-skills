import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import {SequelizeClass} from './db/config/database';
dotenv.config();
import AuthRoute from "./routes/auth.route";
import OtpRoute from "./routes/otp.route";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export class MainServer {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.setupSwagger();
        this.handle404Error();
        this.handleClientError();
    }

    async setConfiguration() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(cors());
        await this.ConnectToDatabase();
    }

    async ConnectToDatabase(){
        const sequelizeDB=new SequelizeClass();
        await sequelizeDB.syncDatabase();
    }

    setRoutes() {
        this.app.use("/api/auth", AuthRoute);
        this.app.use("/api/otp", OtpRoute);
    }

    setupSwagger() {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "API Documentation",
                    version: "1.0.0",
                    description: "This is the API documentation for the tg-backend-skills application.",
                },
                servers: [
                    {
                        url: "http://localhost:3000",
                    },
                ],
            },
            apis: ["./server/src/routes/*.ts"],
        };

        const swaggerSpec = swaggerJsdoc(options);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    handle404Error() {
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                status: 404,
                errorName: "Not Found",
                errorMessage: "Not Found",
            });
        });
    }

    handleClientError() {
        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let errorStatus = (err as any).errorStatus || 500;
                let errorMessage =
                    err.message ||
                    "Something went wrong. Please try again later";
                res.status(errorStatus).json({
                    status: errorStatus,
                    errorName: err.name,
                    errorMessage: errorMessage,
                });
            }
        );
    }
}