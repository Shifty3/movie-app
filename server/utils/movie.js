const axios = require("axios");

const movie = (names, callback) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: names,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzI5OWU5YjViZGRlYjExODUyYjc1NjlmNGFlNjI3ZCIsIm5iZiI6MTczNDQ2NDg2Ny4xMDgsInN1YiI6IjY3NjFkNTYzYzc1MGRkMTFjMmZiMzZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eNtrbEk88prhIp7mplf_bH_-qqN33QD_PuAf7ObCnA4",
    },
  };
  console.log("looking up:", names);
  //returning the axios
  return axios
    .request(options)
    .then((response) => {
      if (response.data.results && response.data.results.length > 0) {
        console.log("Found movies:", response.data.results);
        return response.data.results; // Return the actual movie results
      } else {
        console.log("No movies found.");
        return []; // Return an empty array if no results are found
      }
    })
    .catch((err) => {
      console.error("Error fetching data from TMDB API:", err);
      return []; // Return an empty array in case of error
    });
};

// movie("batman").then((data) => console.log(data));

module.exports = movie;
