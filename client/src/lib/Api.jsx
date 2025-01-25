import React, { useState, useEffect } from "react";
import axios from "axios";
import WordQuiz from "@/components/WordQuiz/WordQuiz";
import McqQuiz from "@/components/Mcq/McqQuiz";
import SentenceQuiz from "@/components/Sentence/SentenceQuiz";
import ReadQuiz from "@/components/ReadAlone/ReadQuiz";
import Quiz from "@/components/Sentence/Quiz";

const Api = ({ category }) => { 

  switch (category) {
    case "all":
      return <AllQuestions category={category} />;
    case "word":
      return <WordQuiz category={category} />;
      case "mcq":
        return <McqQuiz category={category} />;
    case "sentence":
      return <Quiz category={category} />;
    case "read":
      return <ReadQuiz category={category} />;
    default:
      return <div>No valid category selected</div>;
  }
};

export default Api;
