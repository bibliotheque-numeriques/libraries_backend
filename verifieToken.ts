import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserToken {
  id: number;
  username: string;
  email: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "helloyou") as UserToken;
    req.user = decoded; 
    next() 
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};