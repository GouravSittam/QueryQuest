import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your server URL

export const fetchQuizData = async () => {
    try {
        const response = await axios.get(`${API_URL}/word`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tests:', error);
        // Fallback to mock data if the API call fails
        return [
            {
                _id: "1",
                type: "ANAGRAM",
                title: "Rearrange the letters to form a word",
                blocks: [
                    { text: "T", showInOption: true, isAnswer: true },
                    { text: "O", showInOption: true, isAnswer: true },
                    { text: "Y", showInOption: true, isAnswer: true },
                ],
                solution: "TOY",
            },
            {
                _id: "2",
                type: "ANAGRAM",
                title: "Rearrange the letters to form a word",
                blocks: [
                    { text: "C", showInOption: true, isAnswer: true },
                    { text: "A", showInOption: true, isAnswer: true },
                    { text: "T", showInOption: true, isAnswer: true },
                ],
                solution: "CAT",
            },
            // Add more questions here...
        ];
    }
};