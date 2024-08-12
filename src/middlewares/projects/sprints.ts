import { NextFunction, Request, Response } from "express";
import Sprint from "../../models/project/sprint";

export default {
    async findSprint(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { sprintId, projectId } = req.params;
            const { company } = req.user!;

            const sprint = await Sprint.exists({
                company: company._id,
                project: projectId,
                _id: sprintId,
            });

            if (!sprint) {
                return res.status(404).send({ message: "Sprint not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
