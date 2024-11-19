import { NextFunction, Request, Response } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Authenticated");
  return next();
};
