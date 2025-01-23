import React from "react"
import Quiz from "./components/WordQuiz/quiz"
import "./App.css"

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Rearrangement Quiz</h1>
      <Quiz />
    </div>
  )
}

export default App

