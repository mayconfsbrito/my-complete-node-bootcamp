const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

// It's a convetion to use uppercase in model name and variables.
// This is why this Tour variable has the capital T name
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
