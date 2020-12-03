import * as bcrypt from "bcrypt";

export const generateHashSalt = (password: string) => {
  const salted = bcrypt.genSaltSync(12);
  const saltedAndHashed = bcrypt.hashSync(password, salted);
  return saltedAndHashed;
};

export const comparePassword = (password: string, saltedHash: string) => {
  return bcrypt.compareSync(password, saltedHash);
};
