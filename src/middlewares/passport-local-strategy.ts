// import * as passport from "passport";
// import * as LocalStrategy from "passport-local";
// import db from "../db";
// import { comparePassword } from "../utils/passwords";

// passport.use(
//   new LocalStrategy.Strategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const [user] = await db.users.findUser("email", email);
//         if (user?.password && comparePassword(password, user.password)) {
//           delete user.password;
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       } catch (err) {
//         console.log(err);
//         done(err);
//       }
//     }
//   )
// );
