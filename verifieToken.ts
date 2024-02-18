import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "helloyou");
    req.body.user_id = (decoded as any).user_id;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};