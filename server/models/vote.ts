import mongoose, { Schema } from 'mongoose';

const voteSchema: mongoose.Schema = new Schema(
    {
        voter_id: { type: String, required: true },
        target_id: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const Vote = mongoose.model('votes', voteSchema);