import React, { useState } from "react"
import { Button } from "@/components/ui/button"

function ReadAlongQuestion({ question, onAnswer }) {
  const [isReading, setIsReading] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const startReading = () => {
    setIsReading(true)
    const words = question.title.split(" ")
    let progress = 0

    const interval = setInterval(() => {
      progress++
      setReadingProgress(progress)

      if (progress >= words.length) {
        clearInterval(interval)
        setIsReading(false)
        onAnswer(question.title) // Consider the question answered when reading is complete
      }
    }, 300) // Adjust timing as needed
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Read Along</h2>
      <p className="text-lg">
        {question.title.split(" ").map((word, index) => (
          <span key={index} className={index < readingProgress ? "text-primary font-bold" : "text-gray-400"}>
            {word}{" "}
          </span>
        ))}
      </p>
      <Button onClick={startReading} disabled={isReading} className="mt-4">
        {isReading ? "Reading..." : "Start Reading"}
      </Button>
    </div>
  )
}

export default ReadAlongQuestion

