import { NextFunction, Request, Response } from "express";
import Role from "../models/role";

export default {
    async findRole(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { roleId } = req.params;
            const { company } = req.user!;

            const role = await Role.exists({
                company: company._id,
                _id: roleId,
            });

            if (!role) {
                return res.status(404).send({ message: "Role not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
