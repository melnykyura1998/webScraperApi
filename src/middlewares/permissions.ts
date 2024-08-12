import { NextFunction, Request, Response } from "express";
import { IRolePermissions, Permission } from "../interfaces/roles";
import { IUserPopulatedDocument } from "../interfaces/users";
import { additionalPermission } from "../utils/permissions";

export default {
    grantPermission: (scope: keyof IRolePermissions, permission: Permission) => async (
        req: Request<unknown, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { role }: IUserPopulatedDocument = req.user!;

            const permissions = role.permissions[scope];

            if (!permissions.includes(permission) && !additionalPermission(scope, role)) {
                return res.status(403).send({
                    message: `Access denied. User does not have rights to process this action. Scope: '${scope}'`,
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
    isAdmin: async (
        req: Request<unknown, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction) => {
        try {
            console.log("isAdmin");
            const { role }: IUserPopulatedDocument = req.user!;
            if (role.info.id !== "app-admin") {
                return res.status(403).send({
                    message: "Access denied. User does not have rights to process this action.",
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
