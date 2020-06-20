import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, checkImageUrl} from './util/util';
import { url } from 'inspector';
import { authHeader } from './middleware/auth'

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Optional work: implement an auth middleware to prevent public requests
  app.use(authHeader);

  // IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url: imageUrl } = req.query;

    // 1. Validate the image_url query
    // Check query is specified
    if (!imageUrl) {
      return res.send(400).send('image_url is a required query parameter');
    }

    // Check supplied URL is valid
    if (!checkImageUrl(imageUrl)) {
      return res.status(400).send('image_url is not a valid http or https URL');
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
      return res.status(500).send('something went wrong processing the image_url');
    }

  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();