"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zhihuAnswer_1 = require("../models/zhihuAnswer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default();
const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE || "10";
// The pagination here is using a method with low performance.
// The correct way is having a field to indicate the "progress" of the pagination
// And each response should return the progress for next page, so that the next page start from it
// See https://stackoverflow.com/a/23640287
router.route("/:name").get((req, res) => {
    let pageSize = parseInt(req.query.size || DEFAULT_PAGE_SIZE);
    let skipCount = pageSize * (parseInt(req.query.page || "0") - 1);
    zhihuAnswer_1.ZhihuAnswer.find({ entity: req.params.name }, null, { skip: skipCount, limit: pageSize })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(`Error: ${err}`));
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
exports.default = router;
