var express  = require("express")
// var hbs      = require("express-handlebars")
var mongoose = require("./db/connection.js")
var bodyParser = require('body-parser')
var app      = express()
var cors = require('cors')
var Question = mongoose.model("Question")
app.use(cors())
app.listen(4000, () => {
  console.log("app listening on port 4000")
})
app.set("view engine", "hbs");

app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get("/", (req, res) => {
  Question.find({}).then(questions => {
    res.render("questions-index.hbs", {questions: questions})
  })
})
app.get("/api/questions", (req, res) => {
  Question.find({}).then(questions => {
    res.json(questions)
  })
})
app.get("/api/questions/:name", (req, res) => {
  Question.findOne(req.params).then(function (question){
    res.json(question)
  })
})
app.get("/:id", (req, res) => {
  var id = req.params._id
  Question.findOne({id: id}).then(question => {
      res.render("questions-show.hbs", {question: question})
  })
})
app.post("/", (req, res) => {
  Question.create(req.body.question).then(question => {
    res.redirect("/")
  })
})
app.post("/:_id", (req, res) => {
  var id = req.params._id
  Question.findOneAndUpdate({_id: id}, req.body.question, {new: true}).then(question => {
      res.redirect(`/${id}`)
  })
})
