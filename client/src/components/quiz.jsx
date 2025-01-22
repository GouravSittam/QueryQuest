import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Question from "./question"
import { fetchQuizData } from "../lib/api"

function Quiz() {
  const [quizData, setQuizData] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizData(data)
        setUserAnswers(new Array(data.length).fill(""))
        setLoading(false)
      } catch (err) {
        console.error("Error fetching quiz data:", err)
        setError("Failed to load quiz data. Please try again later.")
        setLoading(false)
      }
    }

    loadQuizData()
  }, [])

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let newScore = 0
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.solution) {
        newScore++
      }
    })
    setScore(newScore)
    setShowResults(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">
            Your score: {score} out of {quizData.length}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Question
          question={quizData[currentQuestion]}
          onAnswer={handleAnswer}
          userAnswer={userAnswers[currentQuestion]}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        {currentQuestion === quizData.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default Quiz

