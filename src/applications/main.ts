
import express from "express";
import initMiddlewares from "../middlewares/index";
import { APP_PORT } from "../config";
import router from "../routes/index";
import { errorPostHandler } from "../middlewares/error";
import http from "http";


(async () => {

    const main = express();

    const server = http.createServer(main);

    initMiddlewares(main);

    main.use("/", router);

    main.use(errorPostHandler);

    server.listen(APP_PORT, (): void => {
        console.log(`Server running on port: ${APP_PORT}`);
    });
})();
