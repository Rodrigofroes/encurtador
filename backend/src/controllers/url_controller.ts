import { UrlType } from "../types/url_type";
import { Request, Response } from "express";
import shortid from 'shortid';
import Url from "../models/url_model";
import path from "path";

export default class UrlController {
    async addUrl(req: Request, res: Response) {
        const { originalUrl }: UrlType = req.body;
        if (originalUrl) {
            const shortUrl = shortid.generate();
            const url = new Url({ shortUrl, originalUrl });
            const save = await url.save();
            if (!save) {
                res.status(500).json({ message: "Error saving url" });
            }
            res.status(200).json({ shortUrl });
        } else {
            res.status(400).json({ message: "Invalid url" });
        }
    }

    async getUrl(req: Request, res: Response) {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).redirect('/notfound.html');
        }
    }
}