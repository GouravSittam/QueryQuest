import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Question from "./Question"; // Correct import path
import useFetchQuestion from "@/lib/useFetchQuestion";

const WordQuiz = ({ category }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("hello inside word");
  const data = useFetchQuestion(category);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
      setQuizData(data);
      setUserAnswers(new Array(data.length).fill(""));
      setLoading(false);
    }
  }, [data]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const newScore = quizData.reduce((acc, question, index) => {
      return userAnswers[index] === question.solution ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    setShowResults(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-center text-secondary">
            Your score: {score} out of {quizData.length}
          </p>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => window.location.reload()} className="px-8 py-4 text-lg">
              Restart Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestionData = quizData[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Question
          question={currentQuestionData}
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
  );
};

export default WordQuiz;