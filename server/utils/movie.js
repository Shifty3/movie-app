const request = require("postman-request");

const movie = (names, callback) => {
  const url = `https://api.themoviedb.org/3/search/movie?access_key=1c299e9b5bddeb11852b7569f4ae627d&query=${names}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 1c299e9b5bddeb11852b7569f4ae627d",
    },
  };

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (response.body.error) {
      callback("Unable to conncet to location", undefined);
    } else {
      const movie = response.body.results[0]; // Assuming you're taking the first movie result
      if (movie) {
        callback(undefined, {
          title: movie.title,
          movieID: movie.id,
        });
      }
    }
  });
};

module.exports = movie;
