require('dotenv').config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
};
