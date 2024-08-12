import { NextFunction, Request, Response } from "express";
import ProjectFile from "../../models/project/files";

export default {
    async findProjectFile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { fileId, projectId } = req.params;
            const { company } = req.user!;

            const file = await ProjectFile.exists({
                company: company._id,
                project: projectId,
                _id: fileId,
            });

            if (!file) {
                return res.status(404).send({ message: "Project file not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
