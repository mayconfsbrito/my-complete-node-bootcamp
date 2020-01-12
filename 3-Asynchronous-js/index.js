const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  //Will return a promise that will read the file and return its content
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      //The function REJECT will pass the error to the CATCH handler to the promise below
      if (err) reject('I could not find that file 😢!');

      //This function will pass this value to the promise function below in the THAN handler
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('I could not write the file!');
      resolve('success');
    });
  });
};

//Run the function above and run the promise returned
//To chain THEN methods its necessary to return a promise before calling each of them
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .catch(err => {
    return console.log(err);
  });
