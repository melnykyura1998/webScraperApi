import { NextFunction, Request, Response } from "express";
import * as cheerio from 'cheerio';
import axios from "axios";
import {getHtml} from "../services";
import {SCRAPE_URL, SCRAPE_URL_SINGLE_BID} from "../config";
import {IBid} from "../interfaces/bid";
const fields:{[key:string]:string} = {
    "1":"displayId",
    "2":"title",
    "4":"dueDate",
    "7":"solicitationType",
}
const bidsController = {
    async getBids(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result:IBid[] = [];
            const html = await getHtml(SCRAPE_URL);
            const $ = cheerio.load(html);
                $("table.iv-grid-view > tbody > tr").each((i:any,bid:any)=>{
                    const bidItem:Partial<IBid> = {}
                    const link = $(bid).find("a").attr("href") || ""
                    const id = link.split("/").pop() || ""
                   $(bid).find("td[data-iv-role=\"cell\"]").each((i, item)=>{
                        const field = fields[i.toString()]
                        if(fields[i.toString()]){
                            bidItem[field as keyof IBid] = $(item).text()
                        }
                    })
                  bidItem.id = id;
                  bidItem.link = link;
                  result.push(bidItem as IBid)
                })
            res.json({
                message: "Get Bid Success",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    async getBidById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { bidId } = req.params;
           const bid:Partial<IBid> = {};
            const response = await fetch(SCRAPE_URL_SINGLE_BID.concat(bidId));
            const body = await response.text();
            const $ = cheerio.load(body);
            const table =  $("#body_x_tabc_rfp_ext_prxrfp_ext_x_placeholder_rfp_190512185909 > tbody > tr");
            bid.id = bidId;
            bid.title = $(table).find("#body_x_tabc_rfp_ext_prxrfp_ext_x_lblLabel").text();
            bid.displayId = $(table).find("#body_x_tabc_rfp_ext_prxrfp_ext_x_lblProcessCode").text();
             $(table).find("div.readonly input").each((i,item)=>{
                 if(i === 3){
                     bid.dueDate = $(item).attr("value") || ""
                 }
            });
             $(table).find('input.search').next("div.text").each((i,item)=>{
                 if(i===1){
                     bid.solicitationType = $(item).text()
                 }
            });
            bid.solicitationSummary = $("div.phc-table > table p").text();

            if (!bid.displayId) {
                return res.status(404).send({ message: "Bid not found" });
            }

            res.json({
                message: "Get Bid Success",
                data: bid,
            });
        } catch (error) {
            next(error);
        }
    },

}

export default bidsController;


