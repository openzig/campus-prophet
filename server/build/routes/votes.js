"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vote_1 = require("../models/vote");
const router = express_1.default();
router.route("/:voterId/:targetId").get((req, res) => {
    vote_1.Vote.findOne({ voter_id: req.params.voterId, target_id: req.params.targetId })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
exports.default = router;
