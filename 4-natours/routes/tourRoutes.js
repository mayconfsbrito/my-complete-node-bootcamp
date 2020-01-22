const express = require('express');

const tourController = require('./../controllers/tourController.js');
const router = express.Router();

// Route param to call this function to check the ID parameter value on the middlewares pipeline
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
