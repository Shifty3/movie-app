const request = require("postman-request");

const movie = (names) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?access_key=1c299e9b5bddeb11852b7569f4ae627d&include_adult=false&language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzI5OWU5YjViZGRlYjExODUyYjc1NjlmNGFlNjI3ZCIsIm5iZiI6MTczNDQ2NDg2Ny4xMDgsInN1YiI6IjY3NjFkNTYzYzc1MGRkMTFjMmZiMzZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eNtrbEk88prhIp7mplf_bH_-qqN33QD_PuAf7ObCnA4",
    },
  };

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (response.body.error) {
      callback("Unable to conncet to location", undefined);
    } else {
      callback(undefined, `${response.body.results[0].title}`);
    }
  });
};

module.exports = movie;
