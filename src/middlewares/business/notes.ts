import { NextFunction, Request, Response } from "express";
import BusinessNote from "../../models/bisiness/notes";

export default {
    async findBusinessNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { noteId } = req.params;
            const { company } = req.user!;
            const note = await BusinessNote.exists({
                company: company._id,
                _id: noteId,
            });

            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
