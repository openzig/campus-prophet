import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { Post } from "../models/post";
import dotenv from "dotenv";
import { Vote } from "../models/vote";
import { Comment } from "../models/comment";

dotenv.config();
const router = Router();
const DEFAULT_PAGE_SIZE: string = process.env.DEFAULT_PAGE_SIZE || "10";

router.route("/add").post((req: Request, res: Response) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    voteup_count: 0,
    comment_count: 0,
    poster_id: req.body.poster_id,
    poster_name: req.body.poster_name,
    entity: req.body.entity,
  });

  newPost
    .save()
    .then((value: any) => res.json(value._id))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req: Request, res: Response) => {
  Post.findById(req.params.id)
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id/vote").post((req: Request, res: Response) => {
  const newVote = new Vote({
    voter_id: req.body.voter_id,
    target_id: req.params.id,
  });

  newVote
    .save()
    .then((value: any) => {
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { voteup_count: 1 },
        },
        { new: true }
      )
        .then((result: any) => res.json(result))
        .catch((err: any) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id/comments").get((req: Request, res: Response) => {
  let pageSize: number = parseInt(
    (req.query.size as string) || DEFAULT_PAGE_SIZE
  );
  let skipCount: number =
    pageSize * (parseInt((req.query.page as string) || "0") - 1);
  Comment.find({ post_id: req.params.id }, null, {
    skip: skipCount,
    limit: pageSize,
  })
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

// The pagination here is using a method with low performance.
// The correct way is having a field to indicate the "progress" of the pagination
// And each response should return the progress for next page, so that the next page start from it
// See https://stackoverflow.com/a/23640287
router.route("/search/:name").get((req: Request, res: Response) => {
  let pageSize: number = parseInt(
    (req.query.size as string) || DEFAULT_PAGE_SIZE
  );
  let skipCount: number =
    pageSize * (parseInt((req.query.page as string) || "0") - 1);
  Post.find({ entity: req.params.name }, null, {
    skip: skipCount,
    limit: pageSize,
  })
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router;
