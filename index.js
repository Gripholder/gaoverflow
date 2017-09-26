const express = require("express")
var hbs = require("express-handlebars")
var mongoose = require("./db/connection")

const app = express()

var Question = mongoose.model("Question")

app.listen(4000, () => {
  console.log("app listening on port 4000")
})
app.set("view engine", "hbs")

app.get("/", (req, res) => {
  res.send("Hello World")
})
