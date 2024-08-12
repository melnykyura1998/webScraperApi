import axios from "axios";
import {log} from "util";

export const getHtml = async (url:string)=> {
    const { data: html } = await axios.get(url);
    return html
}
