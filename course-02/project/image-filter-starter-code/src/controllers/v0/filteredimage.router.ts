import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles, checkImageUrl } from '../../util/util';

const router: Router = Router();

// Get all feed items
router.get("/", async (req: Request, res: Response) => {
  const { image_url: imageUrl } = req.query;

  // 1. Validate the image_url query
  // Check query is specified
  if (!imageUrl) {
    return res.status(400).send('Error: image_url is a required query parameter');
  }

  // Check supplied URL is valid
  if (!checkImageUrl(imageUrl)) {
    return res.status(400).send('Error: image_url is not a valid http or https URL');
  }

  // 2. Call filterImageFromURL(image_url) to filter the image
  try {
    const localFile = await filterImageFromURL(imageUrl);

    // 3. Send the resulting file in the response
    res.sendFile(localFile, null, (err) => {
      // 4. Clean up files on success or failure
      deleteLocalFiles([localFile]);
    })
  } catch {
    return res.status(500).send('Error: Something went wrong processing the image_url');
  }

})

export const FilteredImageRouter: Router = router;