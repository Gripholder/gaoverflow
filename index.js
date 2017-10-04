var express  = require("express")
// var hbs      = require("express-handlebars")
var mongoose = require("./db/connection.js")
var bodyParser = require('body-parser')
var app      = express()

var Question = mongoose.model("Question")

app.set("port", process.env.PORT || 3000);
app.set("view engine", "hbs");
// app.engine(".hbs", hbs({
//   extname:        ".hbs",
//   partialsDir:    "views/",
//   layoutsDir:     "views/",
//   defaultLayout:  "layout-main"
// }));



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

app.get("/api/questions", (req, res) => {
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

// app.put("/api/Questions/:name", function(req, res){
//   if(req.session.current_user){
//     Question.findOne(req.params).then(function(Question){
//       if(Question._id !== req.session.current_user._id){
//         res.json({failure: true});
//       }else{
//         Question.update(Question, req.body, {new: true}).then(function(Question){
//           res.json(Question);
//         });
//       }
//     });
//   }else{
//     res.json({failure: true})Question
//   }
// });
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
