const request = require("postman-request");

const recommend = (id, callback) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
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
      callback("Unable to connect to server", undefined);
    } else if (response.body.error) {
      callback("Unable to find movie", undefined);
    } else {
      const recommendedMovies = response.body.results.map(
        (movie) => movie.title
      );

      callback(undefined, `${recommendedMovies}`);
    }
  });
};

module.exports = recommend;
