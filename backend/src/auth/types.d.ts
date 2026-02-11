import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any; // Or replace `any` with a proper user type
}
