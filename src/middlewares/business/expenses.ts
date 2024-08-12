import { NextFunction, Request, Response } from "express";
import { convertIdToObjectId } from "../../utils/converters";
import Expense from "../../models/bisiness/expenses";
import ExpenseGroup from "../../models/bisiness/groupExpenses";

export default {
    async findExpense(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { expenseId } = req.params;
            const { company } = req.user!;
            const expense = await Expense.findOne({
                company: company._id,
                _id: convertIdToObjectId(expenseId),
            });

            if (!expense) {
                return res.status(404).send({ message: "Expense not found" });
            }
            req.expense = (expense as any);

            next();
        } catch (error) {
            next(error);
        }
    },
    async findExpenseGroup(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { groupId } = req.params;
            const { company } = req.user!;
            const expenseGroup = await ExpenseGroup.findOne({
                company: company._id,
                _id: convertIdToObjectId(groupId),
            });

            if (!expenseGroup) {
                return res.status(404).send({ message: "Expense group not found" });
            }
            req.expenseGroup = (expenseGroup as any);

            next();
        } catch (error) {
            next(error);
        }
    },
};
