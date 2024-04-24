import passport from "passport";
import FacebookStrategy from "passport-facebook";

const configFacebookPassport = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env["FACEBOOK_CLIENT_ID"],
        clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
        callbackURL: "/test/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default configFacebookPassport;
