const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const filePathTours = `${__dirname}/dev-data/data/tours-simple.json`;

/**
 * Middlewares
 */
app.use(morgan('dev')); // Logging middleware for requests
app.use(express.json()); // Middleware to help to read the request object on the post requests

// Middleware for testing a middleware with an anonymous function
app.use((req, res, next) => {
  console.log('Hello from the middleware!');

  //Calls the function to pass to the next middleware
  next();
});

/**
 * Route handlers
 */
const tours = JSON.parse(fs.readFileSync(filePathTours));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  // In javascript, when we multiply a string that looks like a number, it will convert that string to a number
  const id = req.params.id * 1;

  //Search in the tours array by the element that have the same id as the id parameter
  const tour = tours.find(el => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(filePathTours, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  // In javascript, when we multiply a string that looks like a number, it will convert that string to a number
  const id = req.params.id * 1;

  //Search in the tours array by the element that have the same id as the id parameter
  const tour = tours.find(el => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  return res.status(204).json({
    status: 'success',
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

/**
 * Routes
 */
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

/**
 * Start Server
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
