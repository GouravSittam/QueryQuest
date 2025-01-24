import React from "react"
import "./App.css"
import Quiz from "./components/WordQuiz/WordQuiz"
import QuestionSearch from "./components/QuestionSearch"

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Rearrangement Quiz</h1>
      <QuestionSearch />
      {/* <Quiz /> */}
    </div>
  )
}

export default App

