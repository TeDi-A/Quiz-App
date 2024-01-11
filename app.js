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
    res.render("createQuiz")
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

app.get("/editQuiz", function (req, res) {
    Quiz.find({})
        .then((quiz) => {
            res.render("edit", {
                savedQuiz: quiz
            })
        }).catch((error) => {
            console.log(error)
        })
})

app.get('/edit/:id', async (req, res) => {
    try {
        const quizId = req.params.id; 
        const quiz = await Quiz.findById(quizId); 
        res.render('editQuizID', { quiz }); 
    } catch (error) {
        console.log(error);
        res.redirect('/'); 
    }
});

app.post("/completeEdit", async function (req, res) { 
    const quizId = req.body.id;
    const editedQuestion = req.body.editQuestion;
    const editedAnswer = req.body.editAnswer;
    console.log(editedQuestion, editedAnswer)
    try {
        const updatedResult = await Quiz.findByIdAndUpdate(
            quizId,
            {
                question: editedQuestion,
                answer: editedAnswer
            },
            { new: true }
        );
        if (updatedResult) {
            console.log("Quiz updated:", updatedResult);
            res.redirect('/');
        } else {
            console.log("Quiz not found.", quizId);
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


app.get('/delete/:id', async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId); 
        res.render('deleteQuizID', { quiz }); 
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

app.post('/confirmDelete', async (req, res) => {
    try {
        const quizId = req.body.id
        let delDoc = await Quiz.findByIdAndDelete(quizId);
        console.log("Quiz Deleted:", delDoc)
        res.redirect('/editQuiz')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

app.listen(4000, function () {
    console.log("Server running on port 4000");
});
