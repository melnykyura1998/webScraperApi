
import cors from "cors";

import { errorPreHandler } from "./error";
import express, { Application } from "express";




declare global {
    namespace Express {
    }
}

export default (app: Application) => {

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb" }));
    app.use(cors());
    app.use("*", errorPreHandler);
};

