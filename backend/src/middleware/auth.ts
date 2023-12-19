import { NextFunction, Request, Response } from "express";

export const checkIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the user ID is 0, skip to the next router

  if (req.headers.user === "admin") {
    return next();
  }
  return res.sendStatus(401);
};
