import { NextFunction, Request, Response } from "express";
import { convertIdToObjectId } from "../utils/converters";
import ToDo from "../models/ToDo";

export default {
    async findTodo(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { toDoId } = req.params;
            const { company } = req.user!;
            const toDo = await ToDo.exists({
                company: company._id,
                _id: convertIdToObjectId(toDoId),
            });

            if (!toDo) {
                return res.status(404).send({ message: "ToDo not found" });
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
