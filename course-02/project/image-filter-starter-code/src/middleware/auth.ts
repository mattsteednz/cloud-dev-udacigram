import { Request, Response } from 'express';

const { AUTH_TOKEN } = process.env;

export function authHeader (req: Request, res: Response, next: Function) {
  // Check for a 'token' header with the value from environment vars
  if (!req.headers.token || req.headers.token !== AUTH_TOKEN) {
    console.log(JSON.stringify(process.env))
    return res.status(401).send('Error: Not authorised, check your token')
  }

  next()
}