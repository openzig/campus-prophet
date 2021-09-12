"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../models/post");
const dotenv_1 = __importDefault(require("dotenv"));
const vote_1 = require("../models/vote");
const comment_1 = require("../models/comment");
dotenv_1.default.config();
const router = express_1.default();
const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE || "10";
router.route("/add").post((req, res) => {
    const newPost = new post_1.Post({
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
        .then((value) => res.json(value._id))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
router.route("/:id").get((req, res) => {
    post_1.Post.findById(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
router.route("/:id/vote").post((req, res) => {
    const newVote = new vote_1.Vote({
        voter_id: req.body.voter_id,
        target_id: req.params.id,
    });
    newVote
        .save()
        .then((value) => {
        post_1.Post.findByIdAndUpdate(req.params.id, {
            $inc: { voteup_count: 1 },
        }, { new: true })
            .then((result) => res.json(result))
            .catch((err) => res.status(400).json(`Error: ${err}`));
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
router.route("/:id/comments").get((req, res) => {
    let pageSize = parseInt(req.query.size || DEFAULT_PAGE_SIZE);
    let skipCount = pageSize * (parseInt(req.query.page || "0") - 1);
    comment_1.Comment.find({ post_id: req.params.id }, null, {
        skip: skipCount,
        limit: pageSize,
    })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
// The pagination here is using a method with low performance.
// The correct way is having a field to indicate the "progress" of the pagination
// And each response should return the progress for next page, so that the next page start from it
// See https://stackoverflow.com/a/23640287
router.route("/search/:name").get((req, res) => {
    let pageSize = parseInt(req.query.size || DEFAULT_PAGE_SIZE);
    let skipCount = pageSize * (parseInt(req.query.page || "0") - 1);
    post_1.Post.find({ entity: req.params.name }, null, {
        skip: skipCount,
        limit: pageSize,
    })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
exports.default = router;
