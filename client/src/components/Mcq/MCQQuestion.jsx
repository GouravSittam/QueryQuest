import React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function MCQQuestion({ question, onAnswer, userAnswer }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{question.title}</h2>
      <RadioGroup value={userAnswer} onValueChange={onAnswer}>
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-4 rounded-lg border transition-colors duration-200 hover:bg-secondary"
          >
            <RadioGroupItem value={option.text} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

