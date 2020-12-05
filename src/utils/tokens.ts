import jwt from "jsonwebtoken";
import config from "../config";
import { IPayload } from "./interfaces";

export const createToken = (payload: IPayload) => {
  if (config.jwt.secret !== undefined) {
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expires,
    });
    return token;
  }
};
