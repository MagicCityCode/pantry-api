// export interface DbResp {
// } // Will need to determine this for pg

import { config } from "dotenv";

const envFound = config();

if (!envFound) {
  throw new Error("env file not found");
}

export interface TUsers {
  id: number;
  email: string;
  pw: string;
  first_name: string;
  last_name: string;
  _created: string;
}

// Add the rest soon
