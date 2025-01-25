import axios from "axios";
import { useEffect, useState } from "react";


const useFetchQuestion = (category) => {
    const [questions, setQuestions] = useState([]);
    console.log(category);
    useEffect(() => {
        const fetchQuestions = async () => {
            console.log(category);
          if (category) {
            console.log(category)
            const response = await axios.get(`https://queryquest-mern.vercel.app/${category}`);
            console.log(response.data)
            setQuestions(response.data);
          } 
          
        };
    
        fetchQuestions();
      }, [category]); 
      if(questions.length > 0){
        return questions;
      }
}

export default useFetchQuestion;