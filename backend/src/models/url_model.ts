import mongoose from 'mongoose';
import { SchemaType } from '../types/url_type';

const urlSchema = new mongoose.Schema<SchemaType>({
    shortUrl: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const Url = mongoose.model('Url', urlSchema);

export default Url;