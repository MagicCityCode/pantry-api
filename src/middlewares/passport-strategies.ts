import * as passport from 'passport';
import * as jwtStrategy from 'passport-jwt';
import * as PassportLocal from 'passport-local';
import config from '../config';
import { comparePassword } from '../utils/passwords';
import type { IPayload } from '../utils/interfaces';
import usersQueries from '../providers/users';

// Create req.user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Local Strategy: user fills out a login form on app, and we use this to check their credentials in our own db. It defaults to username and we override it to use email instead.
passport.use(
  new PassportLocal.Strategy(
    { usernameField: 'email' },
    async (email: string, password: string, done) => {
      try {
        // PassportLocal gives us the email and password someone is attempting to use to log in
        // First thing make sure their email even exists in our db
        const [user] = await usersQueries.findUserByEmail(email);
        // Then we make sure they are real and that the password they're trying to log in with matches what we store in our db
        if (user && comparePassword(password, user.pw)) {
          delete user.pw;
          // This creates req.user with our user's info
          done(null, user);
        } else {
          // This represents a bad login attempt, and Passport will autosend response of 401 Unauthorized
          done(null, false);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    },
  ),
);

passport.use(
  new jwtStrategy.Strategy(
    {
      // This will find the token on our requests, specifically in the request headers under the key 'Authorization' with a value of 'Bearer OUR_TOKEN_HERE' if it sees it, it extracts it
      jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Check the token's secret signature against ours, if not a match, or if expired, autosends response of 401 Unauthorized
      secretOrKey: config.jwt.secret,
    },
    async (payload: IPayload, done) => {
      try {
        // The payload has a userid in it; validation that number exists in our db
        const [user] = await usersQueries.readUsers(payload.id);
        // If user is found, same done workflow from before
        if (user) {
          delete user.pw;
          // Creates req.user with user's info
          done(null, user);
        } else {
          // Something didn't match up in db; 401
          done(null, false);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    },
  ),
);
