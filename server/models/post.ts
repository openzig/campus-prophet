import mongoose, { Schema } from 'mongoose';

const postSchema: mongoose.Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        comment_count: { type: Number, required: true },
        voteup_count: { type: Number, required: true },
        poster_id: { type: Number, required: true },
        poster_name: { type: String, required: true },
        entity: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const Post = mongoose.model('posts', postSchema);