var mongoose = require("mongoose");


var QuestionSchema = new mongoose.Schema({
  content: String,
  answer: String
})

mongoose.model("Question", QuestionSchema)
mongoose.connect("mongodb://aaliyahme123:password@ds147544.mlab.com:47544/react-translator-api")

module.exports = mongoose
