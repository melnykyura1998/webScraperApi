import { NextFunction, Request, Response } from "express";
import Client from "../../models/bisiness/client";
import { convertIdToObjectId } from "../../utils/converters";

export default {
    async findClient(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { clientId } = req.params;
            const { company } = req.user!;
            const client = await Client.findOne({
                company: company._id,
                _id: convertIdToObjectId(clientId),
            });

            if (!client) {
                return res.status(404).send({ message: "Client not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
