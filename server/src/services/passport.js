const { Strategy, ExtractJwt } = require('passport-jwt');
const environment = require('../config/environment');
const { tokenTypes } = require('../config/constants');
const { usersService } = require('.');

const jwtOptions = {
  secretOrKey: environment.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

const jwtVerify = async (request, payload, done) => {
  try {
    if (payload.type !== tokenTypes.access) {
      throw new Error('Invalid token type');
    }
    const user = await usersService.getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, { user, request });
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = jwtStrategy;
