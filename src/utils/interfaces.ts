import { Request } from "express";

export interface ReqUser extends Request {
  user: {
    id: number;
  };
}

export interface IPayload {
  userid: number;
  role?: string;
}
