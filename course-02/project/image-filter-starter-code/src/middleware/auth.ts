import express, { Request, Response } from 'express';

export function authHeader (req: Request, res: Response, next: Function) {
  // Check for a 'token' header with the value of 'udcity'
  if (req.headers.token !== 'udacity') {
    return res.status(401).send('Not authorised')
  }

  next()
}