import { NextFunction, Request, Response } from "express";
import ProjectTask from "../../models/project/baseTaskModel";

export default {
    async findTask(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { taskId, projectId } = req.params;
            const { company } = req.user!;
            const task = await ProjectTask.exists({
                company: company._id,
                project: projectId,
                _id: taskId,
            });

            if (!task) {
                return res.status(404).send({ message: "Project task not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
