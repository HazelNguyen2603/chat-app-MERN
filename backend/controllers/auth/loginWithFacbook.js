import passport from "passport";
import FacebookStrategy from "passport-facebook";
import mongoose from "mongoose";
import { Credential, User } from "../../models/index.js";

const loginWithFacbook = (req, res) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env["FACEBOOK_CLIENT_ID"],
        clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
        callbackURL: "/facebook/callback",
        state: true,
      },
      async function verify(accessToken, refreshToken, profile, cb) {
        try {
          console.log("running");
          const existingCred = await Credential.findOne({
            provider: "https://www.facebook.com",
            subject: profile.id,
          });

          if (!existingCred) {
            console.log("profile", profile);
            const user = new User({ fullName: profile.displayName });
            await user.save();

            const credential = new Credential({
              user_id: user.id,
              provider: "https://www.facebook.com",
              subject: profile.id,
            });
            await credential.save();

            return cb(null, { id: user._id, name: user.name });
          } else {
            const user = await User.findById(existingCred.user_id);
            return cb(null, user ? user : false);
          }
        } catch (error) {
          return cb(err);
        }
      }
    )
  );
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
export { loginWithFacbook };
