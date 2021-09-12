import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { Post } from "../models/post";
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const DEFAULT_PAGE_SIZE: string = process.env.DEFAULT_PAGE_SIZE || "10";

router.route("/:id/posts").get((req: Request, res: Response) => {
  let pageSize: number = parseInt(
    (req.query.size as string) || DEFAULT_PAGE_SIZE
  );
  let skipCount: number =
    pageSize * (parseInt((req.query.page as string) || "0") - 1);
  Post.find({ poster_id: req.params.id }, null, {
    skip: skipCount,
    limit: pageSize,
  })
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router;
