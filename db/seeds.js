var mongoose = require("./connection")

var Question = mongoose.model("Question")

Question.remove({}).thn(() => {
  process.exit()
})
