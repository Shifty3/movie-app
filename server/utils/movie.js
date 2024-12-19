const axios = require("axios");

const movie = (names) => {
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
  //returning the axios
  return axios
    .request(options)
    .then((res) => {
      return {
        title: res.data.results[0].title,
        id: res.data.results[0].id,
      };
    })
    .catch((err) => console.error(err));
};

movie("batman").then((data) => console.log(data));

module.exports = movie;
