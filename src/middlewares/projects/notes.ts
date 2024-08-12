import { NextFunction, Request, Response } from "express";
import ProjectNote from "../../models/project/notes";

export default {
    async findProjectNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { noteId, projectId } = req.params;
            const { company } = req.user!;
            const note = await ProjectNote.exists({
                company: company._id,
                project: projectId,
                _id: noteId,
            });

            if (!note) {
                return res.status(404).send({ message: "Project note not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
