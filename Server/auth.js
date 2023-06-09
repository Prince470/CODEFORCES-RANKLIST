require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.clientID
const GOOGLE_CLIENT_SECRET = process.env.clientSecret

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true,
  scope: ["profile", "email"],
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
  console.log('Authenticated')
  console.log(user)
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});