import { NextFunction, Request, Response } from "express";

export const errorPreHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        await next();
    } catch (e: any) {
        if (e.name === "ValidationError") {
            return res.status(400).send({
                status: e.status || 500,
                errors: Object.values(e.errors).reduce((errors: any, error: any) => ({
                    ...errors,
                    [error.path]: error.message,
                }), { }),
            });
        } else {
            return res.status(e.status).send({
                status: e.status,
                message: e.message,
            });
        }
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorPostHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
    if (!error.code || error.code > 600) {
        error.code = 500;
    }

    return res
        .status(error.code)
        .send({ message: error.message });
};
