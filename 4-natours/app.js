const fs = require('fs');
const express = require('express');

const app = express();
const filePathTours = `${__dirname}/dev-data/data/tours-simple.json`;

// Middleware to help to read the request object on the post requests
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(filePathTours));
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);

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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
