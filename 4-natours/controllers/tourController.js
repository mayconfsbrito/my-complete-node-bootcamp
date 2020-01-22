const fs = require('fs');
const filePathTours = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(filePathTours));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
