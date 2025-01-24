import React from "react"
import Quiz from "./McqQuiz"

export default function QuizPage() {
  const quizData = [
    {
      _id: "6655b1c5d3d666003d3b1d83",
      type: "MCQ",
      options: [
        { isCorrectAnswer: true, text: "under" },
        { isCorrectAnswer: false, text: "below" },
        { isCorrectAnswer: false, text: "above" },
        { isCorrectAnswer: false, text: "over" },
      ],
      siblingId: "66554e47c59979a52d16b1e9",
      title: "In my previous job, I often had to complete tasks ______ tight deadlines.",
    },
    // Add more quiz questions here...
  ]

  return <Quiz data={quizData} />
}

