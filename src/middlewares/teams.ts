import { NextFunction, Request, Response } from "express";
import Team from "../models/team";

export default {
    async findTeam(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { teamId } = req.params;
            const { company } = req.user!;

            const team = await Team.exists({
                company: company._id,
                _id: teamId,
            });

            if (!team) {
                return res.status(404).send({ message: "Team not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
