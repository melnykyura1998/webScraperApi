import { Router } from "express";
import bids from "./bids";


const router = Router();


router.use("/bids",
    bids
);


export default router;
