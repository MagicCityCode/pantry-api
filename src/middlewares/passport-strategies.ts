import * as passport from "passport";
import * as jwtStrategy from "passport-jwt";
import * as PassportLocal from "passport-local";
import config from "../config";
import { comparePassword } from "../utils/passwords";
import type { IPayload } from "../utils/interfaces";
import usersQueries from "../providers/users";

// Create req.user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Local Strategy: user fills out a login form on app which is used to check their credentials in pantry db; defaults to username, overridden to use email
passport.use(
  new PassportLocal.Strategy(
    { usernameField: "email" },
    async (email: string, password: string, done) => {
      try {
        // PassportLocal provides email and pw from login attempts
        // First verifies the email exists in pantry db
        const user = await usersQueries.findUserByEmail(email);
        // Ensures the pw provided matches pantry db for that user
        if (user && comparePassword(password, user.pw)) {
          delete user.pw;
          // Create req.user with user's info
          done(null, user);
        } else {
          // Bad login attempt; Passport will autosend response of 401 Unauthorized
          done(null, false);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

passport.use(
  new jwtStrategy.Strategy(
    {
      // Find the token on reqs, specifically in headers under the key "Authorization" with value of "Bearer ACTUAL_TOKEN_HERE" if found, extracts
      jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Check token's secret signature against ours, if not a match or if expired, autosend response of 401 Unauthorized
      secretOrKey: config.jwt.secret,
    },
    async (payload: IPayload, done) => {
      try {
        // Payload has a userid in it; validation that number exists in our db
        const user = await usersQueries.readUsers(payload.id);
        // If user found, same done workflow from before
        if (user) {
          delete user.pw;
          // Create req.user with user's info
          done(null, user);
        } else {
          // Something didn't match up in db; 401
          done(null, false);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
