import * as jwt from "jsonwebtoken";
import config from "../config";
import { IPayload } from "./interfaces";

export const createToken = (payload: IPayload) => {
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires,
  });
  return token;
};
