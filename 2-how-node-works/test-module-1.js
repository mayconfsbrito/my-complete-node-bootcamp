/**
 * Exporting a unique class, function or variable to this entire module
 */
module.exports = class Calculator {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
};
