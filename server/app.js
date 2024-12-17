const path = require("path");
const express = require("express");
const hbs = require("hbs");
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
  res.render("index", {
    title: "Movie App",
    name: "Ismael Martinez",
  });
});

app.listen(3001, () => {
  console.log("server up!");
});
