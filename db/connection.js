var mongoose = requrie("mongoose");


var QuestionSchema = new mongoose.Schema({
  body: String
})
var AnswerSchema = new mongoose.Schema({
  body: String
})

mongoose.model("Question", QuestionSchema)
mongoose.connect("mongodb://localhost/gaoverflow")

module.exports = mongoose
