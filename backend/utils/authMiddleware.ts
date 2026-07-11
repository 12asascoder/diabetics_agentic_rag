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
  // Authentication has been completely removed as per user request.
  // We attach a mock global administrator to satisfy downstream schema relationships.
  req.researcher = {
    _id: '66923b2c1234567890abcdef',
    name: 'Global Administrator',
    email: 'admin@diaresearch.iq',
    institution: 'DiaResearch Global',
    role: 'admin'
  };
  
  next();
};
