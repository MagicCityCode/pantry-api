// export interface DbResp {
// } // Will need to determine this for pg

export interface TUsers {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  _created?: Date;
}

export interface TTokens {
  id?: number;
  userid?: number;
  uniq?: string;
  jwt?: string;
  _created?: Date;
}
