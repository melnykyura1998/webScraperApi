import { Router } from "express";
import bidsController from "../controllers/bids";

const router = Router();

router
    .get("/",
        bidsController.getBids
    )
    .get("/:bidId",
        bidsController.getBidById
    )

export default router;
