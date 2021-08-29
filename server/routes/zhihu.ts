import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { ZhihuAnswer } from "../models/zhihuAnswer";
import dotenv from "dotenv";

dotenv.config()
const router = Router();
const DEFAULT_PAGE_SIZE: string = process.env.DEFAULT_PAGE_SIZE || "10"

// The pagination here is using a method with low performance.
// The correct way is having a field to indicate the "progress" of the pagination
// And each response should return the progress for next page, so that the next page start from it
// See https://stackoverflow.com/a/23640287
router.route("/:name").get((req: Request, res: Response) => {
  let pageSize: number = parseInt(req.query.size as string || DEFAULT_PAGE_SIZE)
  let skipCount: number = pageSize * (parseInt(req.query.page as string || "0") - 1)
  ZhihuAnswer.find({ entity: req.params.name }, null, { skip: skipCount, limit: pageSize })
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

/* router.route("/add").post((req: Request, res: Response) => {
  const newSearchResult = new Review({
    title: req.body.title,
    caption: req.body.caption,
    refId: req.body.refId,
    schoolName: req.body.schoolName,
  });

  newSearchResult
    .save()
    .then((value: IReview) => res.json(value._id))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
}); */

export default router;
