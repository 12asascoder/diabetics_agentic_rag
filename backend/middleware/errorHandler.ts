import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let code = err.code || 'SERVER_ERROR';

  // Handle Mongoose Duplicate Key (usually code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered. Record already exists.';
    code = 'DUPLICATE_KEY';
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    code = 'VALIDATION_ERROR';
  }

  // Ensure 401s don't look like 500s
  if (message.includes('Invalid') || message.includes('Authentication')) {
     statusCode = 401;
     code = 'UNAUTHORIZED';
  }

  // Log the error securely (hide passwords, show stack only in dev)
  logger.error(`[Error] ${req.method} ${req.originalUrl} - Code: ${statusCode} - ${message}`);
  if (env.NODE_ENV !== 'production') {
    logger.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    code,
    message,
    ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
