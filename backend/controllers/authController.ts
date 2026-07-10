import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Researcher from '../models/Researcher';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY || 'development_secret_key', {
    expiresIn: '30d',
  });
};

export const registerResearcher = async (req: Request, res: Response): Promise<void> => {
  const { name, institution, email, password } = req.body;

  try {
    const researcherExists = await Researcher.findOne({ email });

    if (researcherExists) {
      res.status(400).json({ message: 'Researcher already exists' });
      return;
    }

    if (!password || password.length < 8) {
       res.status(400).json({ message: 'Password must be at least 8 characters long' });
       return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const researcher = await Researcher.create({
      name,
      institution,
      email,
      passwordHash,
    });

    if (researcher) {
      const token = generateToken(researcher._id.toString());
      
      // Set JWT in HTTPOnly cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: researcher._id,
        name: researcher.name,
        email: researcher.email,
        institution: researcher.institution,
      });
    } else {
      res.status(400).json({ message: 'Invalid researcher data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginResearcher = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const researcher = await Researcher.findOne({ email });

    if (researcher && (await bcrypt.compare(password, researcher.passwordHash))) {
      const token = generateToken(researcher._id.toString());
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: researcher._id,
        name: researcher.name,
        email: researcher.email,
        institution: researcher.institution,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutResearcher = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
