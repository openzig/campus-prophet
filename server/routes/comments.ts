import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { Comment } from "../models/comment";
import { Post } from "../models/post";

const router = Router();

router.route("/add").post((req: Request, res: Response) => {
  const newComment = new Comment({
    content: req.body.content,
    parent_id: req.body.parent_id,
    reply_to_post: req.body.reply_to_post,
    voteup_count: 0,
    commenter_id: req.body.commenter_id,
    commenter_name: req.body.commenter_name,
  });

  newComment
    .save()
    .then((value: any) => {
      // Increment comments count if it is replying to a post
      if (req.body.reply_to_post) {
        Post.findByIdAndUpdate(
          req.body.parent_id,
          {
            $inc: { comment_count: 1 },
          },
          { new: true }
        )
          .then((result: any) => res.json(result))
          .catch((err: any) => res.status(400).json(`Error: ${err}`));
      }
    })
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router;
