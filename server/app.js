const path = require("path");
const express = require("express");
const hbs = require("hbs");
const movie = require("./utils/movie");
const recommend = require("./utils/recommend");
// const movie = require("movie");

const app = express();

const pubDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pubDirPath));

app.get("", (req, res) => {
  res.render("index", { title: "Ismael", name: "martinez" });
});

app.get("/movies", async (req, res) => {
  console.log("Movie query:", req.query.query);

  if (!req.query.query || !req.query.query.length) {
    return res.send({
      error: " Must Provide a movie name",
    });
  }

  try {
    // Call the movie function to get the movie data
    const movieData = await movie(req.query.query);

    // Send the fetched movie data to the client
    res.send({
      results: movieData,
    });
  } catch (err) {
    console.error("Error fetching movie data:", err);
    res.send({ error: "Failed to fetch movie data" });
  }
});
app.listen(3001, () => {
  console.log("server up!");
});
