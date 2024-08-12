import { NextFunction, Request, Response } from "express";
import Pipeline from "../models/pipeline";

export default {
    async findPipeline(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { pipelineId } = req.params;
            const { company } = req.user!;

            const pipeline = await Pipeline.exists({
                company: company._id,
                _id: pipelineId,
            });

            if (!pipeline) {
                return res.status(404).send({ message: "Pipeline not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
