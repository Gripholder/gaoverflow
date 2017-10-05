const express    = require("express")
const cors       = require("cors")
const mongoose   = require("./db/connection.js")
const bodyParser = require("body-parser")



const Question = mongoose.model("Question")
const app = express()

  app.use(cors())


app.listen(4000, () => {
  console.log("app listening on port 4000")
})

app.set("view engine", "hbs")

app.use("/assets", express.static("public"))
app.use(bodyParser.json({
  extended: true
}))
// app.engine(".hbs", hbs({
//   extname: ".hbs",
//   partialsDir: "views/",
//   layoutsDir: "views/",
//   defaultLayout: "layout-main"
// }))

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

app.get("/:id", (req, res) => {
  var id = req.params._id
  Question.find({"_id": ObjectId(`${id}`)}).then(question => {
      res.render("questions-show.hbs", {question: question})
  })
})

app.get("/api/questions/:id", (req, res) => {
  Question.findOne({ id: req.params._id }).then(question => {
    console.log("hey")
    res.json(question)
  })
})

app.post("/", (req, res) => {
  Question.create(req.body.question).then(question => {
    res.redirect("/")
  })
})

app.post("/api/questions", (req, res) => {
  console.log(req.body);
  Question.create(req.body).then(question => {
    res.json(question)
  })
})

app.post("/:_id", (req, res) => {
  var id = req.params._id
  Question.findOneAndUpdate({_id: id}, req.body.question, {new: true}).then(question => {
      res.redirect(`/${id}`)
  })
})
