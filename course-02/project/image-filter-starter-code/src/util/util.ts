import fs from 'fs';
import Jimp = require('jimp');
import { parse } from 'url'

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise(async (resolve, reject) => {
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';

        // Udacity code has a workaround for this Jimp bug: https://github.com/oliver-moran/jimp/issues/803
        // Broken with a specific combo of Jimp and TS, hence the old style require()
        // @ts-ignore
        const photo = await Jimp.read(inputURL).then((img: any) => {
            img.resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname+outpath, (img: any) => {
                resolve(__dirname+outpath);
            })
          }
        ).catch((err: Error) => {
          reject(err)
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

export function checkImageUrl(imageUrl: string) {
  try {
    // Parse will throw a TypeError if image isn't a string
    const pUrl = parse(imageUrl)
    
    // Add an additional check for an http image
    if (pUrl.protocol !== 'http:' && pUrl.protocol !== 'https:') {
      throw Error()
    }
  } catch (e) {
    return false
  }

  return true
}