const input = document.querySelector("input");
const form = document.querySelector("form");
const output = document.querySelector(".output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const movie = input.value;

  output.textContent = "Loading...";
  output.style.display = "block";

  // Fetch movie data from the backend (same origin)
  fetch(`/movies?query=${encodeURIComponent(movie)}&language=en-US&page=1`)
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => {
      if (data.error) {
        output.textContent = data.error; // Show error message if data contains error
      } else if (data.results && data.results.length > 0) {
        output.innerHTML = ""; // Clear previous results
        output.style.display = "block";

        // Loop through all results and display them
        data.results.forEach((result) => {
          const movieContainer = document.createElement("div");

          // Create a new element for each movie title
          const movieElement = document.createElement("p");
          movieElement.textContent = result[0].title;

          // Optionally, display the movie's release date
          const releaseDateElement = document.createElement("small");
          releaseDateElement.textContent = `(${
            result[0].release_date || "N/A"
          })`;

          // Append elements to the container
          movieContainer.appendChild(movieElement);
          movieContainer.appendChild(releaseDateElement);

          // Append the container to the output div
          output.appendChild(movieContainer);
        });
      } else {
        output.textContent = "No results found."; // If no results, show this message
      }
    })
    .catch((error) => {
      output.textContent = "Error fetching data."; // In case of any error
      console.error(error);
    });
});
