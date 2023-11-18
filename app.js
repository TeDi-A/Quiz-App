const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/QuizDB")

const quizSchema = {
    question: String,
    answer: String
}

const Quiz = mongoose.model("Quiz", quizSchema)

app.get("/", function (req, res) {
    res.render("Home")
})

app.get("/createQuiz", function (req, res) {
    res.render("questions")
})

app.post("/createQuiz", function (req, res) {
    const quiz = new Quiz({
        question: req.body.newQuestion,
        answer: req.body.newAnswer
    })
    quiz.save()
    res.redirect("/");
})

app.get("/startQuiz", function (req, res) {
    const quizID = req.params.id

    Quiz.find({})
        .then((quiz) => {
            res.render("Started", {
                savedQuiz: quiz,
                currentQuizIndex: 0
            })
        }).catch((error) => {
            console.log(error)
        })
    
})

app.get("/editQuiz", function (req, res){
    Quiz.find({})
    .then((quiz) => {
        res.render("edit", {
            savedQuiz: quiz
          
        })
    }).catch((error) => {
        console.log(error)
    })
})

app.listen(4000, function () {
    console.log("Server running on port 4000");
});
