var mongoose = require("./connection.js")

var Question = mongoose.model("Question")

Question.remove({}).then(() => {
  process.exit()
})
