import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { login, logout, signup } from "../controllers/auth/index.js";
import { Credential, User } from "../models/index.js";
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_CLIENT_ID"],
      clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/facebook",
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
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/api/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
