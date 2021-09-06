import mongoose, { Schema } from "mongoose";

const commentSchema: mongoose.Schema = new Schema(
  {
    parent_id: { type: String, required: true, index: true },
    reply_to_post: { type: Boolean, required: true },
    content: { type: String, required: true },
    voteup_count: { type: Number, required: true },
    commenter_id: { type: String, required: true },
    commenter_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("comments", commentSchema);
