import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../modle/user.modle.js";

// Only configure Google strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
      },
      async (_, __, profile, done) => {
        try {
          const email = profile.emails[0].value;

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              provider: "google",
              firstName: profile.name.givenName,
              email: email,
              gender: "other",
            });
          }

          return done(null, user);

        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

export { passport };
