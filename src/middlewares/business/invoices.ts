import { NextFunction, Request, Response } from "express";
import { convertIdToObjectId } from "../../utils/converters";
import Invoice from "../../models/bisiness/invoices";
import InvoiceGroup from "../../models/bisiness/group";

export default {
    async findInvoice(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { invoiceId } = req.params;
            const { company } = req.user!;
            const invoice = await Invoice.findById({
                company: company._id,
                _id: convertIdToObjectId(invoiceId),
            });

            if (!invoice) {
                return res.status(404).send({ message: `Invoice with id ${invoiceId} not found ` });
            }
            req.invoice = (invoice as any);
            next();
        } catch (error) {
            next(error);
        }
    },
    async findInvoiceGroup(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { groupId } = req.params;
            const { company } = req.user!;
            const invoiceGroup = await InvoiceGroup.findOne({
                company: company._id,
                _id: convertIdToObjectId(groupId),
            });

            if (!invoiceGroup) {
                return res.status(404).send({ message: "Invoice group not found" });
            }
            req.invoiceGroup = (invoiceGroup as any);

            next();
        } catch (error) {
            next(error);
        }
    },
};
