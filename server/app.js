const path = require("path");
const express = require("express");
const hbs = require("hbs");
const movie = require("./utils/movie");
const recommend = require("./utils/recommend");
const { title } = require("process");
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

app.get("/movies", (req, res) => {
  const movieName = req.query.query;
  console.log("Movie query:", movieName);

  if (!movieName) {
    return res.send({
      error: " Must Provide a movie name",
    });
  }

  movie(movieName, (error, movieData) => {
    if (error) {
      return res.send({ error });
    }

    console.log("Fetched movie data:", movieData);

    recommend(movieData.movieID, (error, recommendedMovies) => {
      if (error) {
        return res.send({ error });
      }

      console.log("Fetched recommendations:", recommendedMovies);

      res.send({
        title: movieData.title,
        recommendations: recommendedMovies,
      });
    });
  });
});

app.listen(3001, () => {
  console.log("server up!");
});
