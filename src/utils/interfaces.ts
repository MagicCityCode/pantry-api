import { Request } from 'express';

export interface ReqUser extends Request {
  user?: {
    id?: number;
    email?: string;
    pw?: string;
  };
}

export interface IPayload {
  id?: number;
  tokenid?: number;
  role?: string;
}
