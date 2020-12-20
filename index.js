const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const Pokedex = require("pokedex-promise-v2");
const Poke = new Pokedex();

//Configs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
//Search by name
app.get("/", (req, res) => {
  res.render("poke");
});

app.post("/pokemon", (req, res) => {
  const pokeName = req.body.pokeName.toLowerCase();
  res.redirect(`/pokemon/${pokeName}`);
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;

  axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then(resp => {
    // res.json({ resp: resp.data })
    res.render("unique", { info: resp.data })
  })
});

app.listen(5500);


