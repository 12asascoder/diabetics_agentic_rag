import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Researcher from '../models/Researcher';
import { env } from '../config/env';
import { asyncHandler } from '../middleware/asyncHandler';
import { logger } from '../config/logger';

const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });
};

export const registerResearcher = asyncHandler(async (req: Request, res: Response) => {
  const { name, institution, email, password } = req.body;
  logger.info(`[Auth] Attempting registration for email: ${email}`);

  const researcherExists = await Researcher.findOne({ email });

  if (researcherExists) {
    logger.warn(`[Auth] Registration failed - Email already exists: ${email}`);
    res.status(409); // Conflict
    throw new Error('Researcher already exists');
  }

  if (!password || password.length < 8) {
    logger.warn(`[Auth] Registration failed - Weak password for: ${email}`);
    res.status(422); // Unprocessable Entity
    throw new Error('Password must be at least 8 characters long');
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
    logger.info(`[Auth] Successfully registered researcher: ${researcher._id}`);
    const token = generateToken(researcher._id.toString());
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: researcher._id,
      name: researcher.name,
      email: researcher.email,
      institution: researcher.institution,
    });
  } else {
    logger.error(`[Auth] Invalid researcher data during creation for: ${email}`);
    res.status(400);
    throw new Error('Invalid researcher data');
  }
});

export const loginResearcher = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  logger.info(`[Auth] Attempting login for email: ${email}`);

  const researcher = await Researcher.findOne({ email });

  if (researcher && (await bcrypt.compare(password, researcher.passwordHash))) {
    logger.info(`[Auth] Successful login for: ${researcher._id}`);
    const token = generateToken(researcher._id.toString());
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: env.NODE_ENV !== 'development',
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
    logger.warn(`[Auth] Failed login attempt for email: ${email}`);
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const logoutResearcher = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
