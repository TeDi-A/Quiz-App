const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/QuizDB")

const questionSchema = {
    question: String,
    answer: String
}

const Question = mongoose.model("Question", questionSchema)

app.get("/", function (req, res) {
    res.render("Home")
})

app.get("/questions", function (req, res) {
    res.render("questions")
})

app.post("/questions", function (req, res) {
    const question = new Question({
        question: req.body.newQuestion,
        answer: req.body.newAnswer
    })
    question.save()
    res.redirect("/");
})

app.get("/startQuiz", function (req, res) {
    res.render("Started")
})

app.listen(4000, function () {
    console.log("Server running on port 4000");
});
