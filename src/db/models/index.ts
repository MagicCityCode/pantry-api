// export interface DbResp {
// } // Will need to determine this for pg

import { config } from 'dotenv';

const envFound = config();

if (!envFound) {
  throw new Error('env file not found');
}

export interface TUsers {
  id: number;
  email: string;
  pw: string;
  firstName: string;
  lastName: string;
  _created: string;
}

export interface TIngredients {
  id: number;
  name: string;
  shelfLife: number;
  storage: string;
  uom: string;
  _created: Date;
  shelfLifeUnit: string;
}
