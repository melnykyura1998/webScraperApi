import { NextFunction, Request, Response } from "express";
import BusinessFile from "../../models/bisiness/files";

export default {
    async findBusinessFile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { fileId } = req.params;
            const { company } = req.user!;

            const file = await BusinessFile.exists({
                company: company._id,
                _id: fileId,
            });

            if (!file) {
                return res.status(404).send({ message: "File not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
