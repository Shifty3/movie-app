const input = document.querySelector("input");
const form = document.querySelector("form");
const output = document.querySelector(".output");

form
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const movie = input.value;

    fetch(`/movies?&query=${encodeURIComponent(movie)}&language=en-US&page=1`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => {
        console.log("inb movies we gots ", data);

        output.innerHTML = "";

        // Check if there are results
        if (data.results && data.results.length > 0) {
          // Loop through the results and create an element for each movie
          data.results.forEach((movieData) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-item");

            const movieName = document.createElement("h3");
            movieName.classList.add("movie-name");
            movieName.textContent = movieData.title;

            const movieReleaseDate = document.createElement("p");
            movieReleaseDate.classList.add("movie-release-date");
            movieReleaseDate.textContent = `Release Date: ${movieData.release_date}`;

            const movieOverview = document.createElement("p");
            movieOverview.classList.add("movie-overview");
            movieOverview.textContent = movieData.overview;

            // Append the movie details to the movieDiv
            movieDiv.appendChild(movieName);
            movieDiv.appendChild(movieReleaseDate);
            movieDiv.appendChild(movieOverview);

            // Append the movieDiv to the output container
            output.appendChild(movieDiv);
          });
        } else {
          // Handle no results found
          output.innerHTML = "<p>No movies found matching your search.</p>";
        }
      });
  })
  .catch((error) => {
    output.textContent = "Error fetching data."; // In case of any error
    console.error(error);
  });
