import Router from 'express'
import { Request, Response } from 'express-serve-static-core';
import { SearchResult } from '../models/searchResult';

const router = Router();

router.route('/:name').get((req: Request, res: Response) => {
    SearchResult.find()
})
