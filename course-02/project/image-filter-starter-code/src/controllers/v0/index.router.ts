import { Router, Request, Response } from 'express';
import { FilteredImageRouter } from './filteredimage.router';

const router: Router = Router();

router.use('/filteredimage', FilteredImageRouter);

router.get( "/", async ( req, res ) => {
  res.send("Try GET /filteredimage?image_url={{}}")
});

export const IndexRouter: Router = router;