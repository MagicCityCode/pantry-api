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
  createdAt: string;
}

export interface TIngredients {
  id: number;
  name: string;
  shelfLife: number;
  storage: string;
  uom: string;
  createdAt: string; // Later change this to 'Date'
  shelfLifeUnit: string;
}

export interface TUserInventory {
  item: string;
  quantity: number;
  unitOfMeasure: string;
  daysUntilExpiration: number;
}
