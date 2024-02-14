import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token unauthaurized' });
    }

    try {
        const decoded = jwt.verify(token, 'helloyou');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide' });
    }
};