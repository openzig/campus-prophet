import mongoose, { Schema } from 'mongoose';

const searchResult: mongoose.Schema = new Schema(
    {
        title: { type: String, required: true },
        caption: { type: String, required: true },
        refId: { type: String, required: true },
        universityName: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const SearchResult = mongoose.model('Index', searchResult);