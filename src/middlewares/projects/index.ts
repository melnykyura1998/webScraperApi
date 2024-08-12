import { NextFunction, Request, Response } from "express";
import Project from "../../models/project";
import { setOptionalField } from "../../utils/queries";

export default {
    async findProject(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { projectId } = req.params;
            const { company } = req.user!;
            const isAdmin = req.isAdmin;

            const project = await Project.findOne({
                ...setOptionalField("company", isAdmin ? undefined : company._id),
                _id: projectId,
            });
            if (!project) {
                return res.status(404).send({ message: "Project not found" });
            }
            req.project = (project as any);

            next();
        } catch (error) {
            next(error);
        }
    },
};
