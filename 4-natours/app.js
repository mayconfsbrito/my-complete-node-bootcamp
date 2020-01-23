const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

/**
 * Middlewares
 */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // Logging middleware for requests
app.use(express.json()); // Middleware to help to read the request object on the post requests
app.use(express.static(`${__dirname}/public`)); // Allow to request for static files in public folder

// Middleware for testing a middleware with an anonymous function
app.use((req, res, next) => {
  console.log('Hello from the middleware!');

  //Calls the function to pass to the next middleware
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
