import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import UrlController from './controllers/url_controller'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const mongo = process.env.MONGO_URI as string;
mongoose.connect(mongo);

app.use(express.static(path.join(__dirname, '../public')));

app.post('/create-short-url', (req, res) => {
    const urlController = new UrlController();
    urlController.addUrl(req, res);
});


app.get('/:shortUrl', (req, res) => {
    const urlController = new UrlController();
    urlController.getUrl(req, res);
});

app.listen(3001, () => console.log("Server started on port 3001"));
