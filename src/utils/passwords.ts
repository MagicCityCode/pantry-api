import * as bcrypt from 'bcryptjs';

export const generateHashSalt = (password: string) => {
  const salted = bcrypt.genSaltSync(12);
  const saltedAndHashed = bcrypt.hashSync(password, salted);
  return saltedAndHashed;
};

export const comparePassword = (password: string, saltedHash: string) =>
  bcrypt.compareSync(password, saltedHash);
