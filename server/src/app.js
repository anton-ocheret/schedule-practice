const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');

const environment = require('./config/environment');
const morgan = require('./services/morgan');
const router = require('./router');
const ApiError = require('./utils/api-error');
const { authLimiter } = require('./middlewares/rate-limiter');
const { errorConverter, errorHandler } = require('./middlewares/error');
const jwtStrategy = require('./services/passport');

const app = express();

if (environment.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', router);

// limit repeated failed requests to auth endpoints
if (environment.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
