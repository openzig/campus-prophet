import Router from "express";
import { Request, Response } from "express-serve-static-core";
import { Vote } from "../models/vote";

const router = Router();

router.route("/:voterId/:targetId").get((req: Request, res: Response) => {
  Vote.findOne({ voter_id: req.params.voterId, target_id: req.params.targetId })
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router;
