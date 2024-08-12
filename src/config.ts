process.env.NODE_CONFIG_DIR = __dirname + "/config";

import config from "config";
import dotenv from "dotenv";

dotenv.config();

const APP_PORT: number = config.get("port.app");
const CLIENT_URL: string = config.get("clientUrl");
const SCRAPE_URL: string = config.get("scrapeUrl");
const SCRAPE_URL_SINGLE_BID: string = config.get("scrapeUrlSingleBid");

export {
    APP_PORT,
    CLIENT_URL,
    SCRAPE_URL,
    SCRAPE_URL_SINGLE_BID
};
