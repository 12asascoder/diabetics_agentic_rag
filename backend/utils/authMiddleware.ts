import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Researcher from '../models/Researcher';
import { env } from '../config/env';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      researcher?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;
  
  if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload;
      req.researcher = await Researcher.findById(decoded.id).select('-passwordHash');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
