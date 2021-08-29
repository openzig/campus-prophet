import mongoose, { Schema } from 'mongoose';

const zhihuAnswerSchema: mongoose.Schema = new Schema(
    {
        _id: { type: Number, required: true },
        content: { type: String, required: true },
        created_time: { type: Number, required: true },
        comment_count: { type: Number, required: true },
        voteup_count: { type: Number, required: true },
        question_id: { type: Number, required: true },
        entity: { type: String, required: true }
    }
);

export const ZhihuAnswer = mongoose.model('zhihu_answers', zhihuAnswerSchema);