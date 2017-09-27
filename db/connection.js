var mongoose = require("mongoose");


var QuestionSchema = new mongoose.Schema({
  content: String,
  answer: String
})

mongoose.model("Question", QuestionSchema)
mongoose.connect("mongodb://localhost/gaoverflow")

module.exports = mongoose
