import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { Comment } from "../models/comment";
import { Post } from "../models/post";

const router = Router();

router.route("/add").post((req: Request, res: Response) => {
  const newComment = new Comment({
    post_id: req.body.post_id,
    content: req.body.content,
    parent_id: req.body.parent_id,
    voteup_count: 0,
    commenter_id: req.body.commenter_id,
    commenter_name: req.body.commenter_name,
  });

  newComment
    .save()
    .then((value: any) => {
      Post.findByIdAndUpdate(
        req.body.post_id,
        {
          $inc: { comment_count: 1 },
        },
        { new: true }
      )
        .then((result: any) => res.json(value))
        .catch((err: any) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router;
