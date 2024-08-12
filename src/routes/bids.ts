import { Router } from "express";
import bidsController from "../controllers/bids";
import teamsMiddleware from "../middlewares/teams";
import permissionsMiddleware from "../middlewares/permissions";

const router = Router();

router
    .get("/",
        bidsController.getBids
    )
    // .param("bidId",
    //     Middleware.findTeam
    // )
    .get("/:bidId",
        bidsController.getBidById
    )

export default router;
