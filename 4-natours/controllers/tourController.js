const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({});
};

exports.getTour = (req, res) => {
  console.log(req.params);

  // In javascript, when we multiply a string that looks like a number, it will convert that string to a number
  const id = req.params.id * 1;

  //Search in the tours array by the element that have the same id as the id parameter
  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tours: tour
  //   }
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.updateTour = (req, res) => {
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
