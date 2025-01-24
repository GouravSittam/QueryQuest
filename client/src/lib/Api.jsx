// import axios from 'axios';

// const API_URL = 'http://localhost:5000'; // Replace with your server URL

// export const Api = async () => {
//     try {
//         const response = await axios.get(${API_URL}/word);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching tests:', error);
//         // Fallback to mock data if the API call fails
//         return [
//             {
//                 _id: "1",
//                 type: "ANAGRAM",
//                 title: "Rearrange the letters to form a word",
//                 blocks: [
//                     { text: "T", showInOption: true, isAnswer: true },
//                     { text: "O", showInOption: true, isAnswer: true },
//                     { text: "Y", showInOption: true, isAnswer: true },
//                 ],
//                 solution: "TOY",
//             },
//             {
//                 _id: "2",
//                 type: "ANAGRAM",
//                 title: "Rearrange the letters to form a word",
//                 blocks: [
//                     { text: "C", showInOption: true, isAnswer: true },
//                     { text: "A", showInOption: true, isAnswer: true },
//                     { text: "T", showInOption: true, isAnswer: true },
//                 ],
//                 solution: "CAT",
//             },
//             // Add more questions here...
//         ];
//     }
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import WordQuiz from "@/components/WordQuiz/WordQuiz";
import McqQuiz from "@/components/Mcq/McqQuiz";
import SentenceQuiz from "@/components/Sentence/SentenceQuiz";
import ReadQuiz from "@/components/ReadAlone/ReadQuiz";
import Quiz from "@/components/Sentence/Quiz";

const Api = ({ category }) => { // Provide a default value for category
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/${category}`);
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]); // Refetch questions whenever category changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  switch (category) {
    case "all":
      return <AllQuestions data={questions} />;
    case "word":
      return <WordQuiz data={questions} />;
      case "mcq":
        return <McqQuiz data={questions} />;
    case "sentence":
      return <Quiz data={questions} />;
    case "read":
      return <ReadQuiz data={questions} />;
    default:
      return <div>No valid category selected</div>;
  }
};

export default Api;
