import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { setOptionalField } from "../utils/queries";

export default {
    async findUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userId } = req.params;
            const { company } = req.user!;
            const isAdmin = req.isAdmin;
            const user = await User.exists({
                ...setOptionalField("company", isAdmin ? undefined : company._id),
                _id: userId,
            });

            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
