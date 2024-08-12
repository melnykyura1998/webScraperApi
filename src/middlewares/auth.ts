import authManager from "../managers/auth";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export default {
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers; // here comes the token

            if (!authorization) {
                return res.status(401).send({
                    message: "Error: Unauthorized. Unable to authenticate the user",
                });
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, token] = authorization.split(" ");

            const user = await authManager.verifyUser(token);

            if (!user) {
                return res
                    .status(401)
                    .send({ message: "Unauthorized. Invalid token" });
            }

            const profile = await User.getUserProfile(user._id);

            if (!profile) {
                return res.status(401).send({ message: "Server Error. No user profile" });
            }

            req.user = profile;
            req.isAdmin = profile.role.info.id === "app-admin";
            return next();
        } catch (e) {
            return next(e);
        }
    },
};
