// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { fetchQuestions } from "../api/questions";
// import { ArrowLeft, ArrowRight, Search } from "lucide-react";

// const categories = ["word", "mcq", "read", "sentence"];

// export default function QuestionSearch() {
//   const [questions, setQuestions] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const questionsPerPage = 5;

//   useEffect(() => {
//     const searchQuestions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const results = await fetchQuestions(searchQuery, selectedCategory);
//         setQuestions(results);
//         setCurrentPage(1);
//       } catch (err) {
//         console.error("Error searching questions:", err);
//         setError("Failed to search questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     searchQuestions();
//   }, [searchQuery, selectedCategory]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Triggered by useEffect when searchQuery changes
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handlePrevious = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const totalPages = Math.ceil(questions.length / questionsPerPage);
//   const paginatedQuestions = questions.slice(
//     (currentPage - 1) * questionsPerPage,
//     currentPage * questionsPerPage
//   );

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-primary mb-4">Question Search</CardTitle>
//         <form onSubmit={handleSearch} className="flex flex-col gap-2">
//           <div className="flex gap-2">
//             <Input
//               type="text"
//               placeholder="Search questions..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-grow"
//             />
//             <Button type="submit" className="flex items-center justify-center">
//               <Search className="mr-2" /> Search
//             </Button>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             <Button
//               variant={selectedCategory === "all" ? "default" : "outline"}
//               onClick={() => handleCategoryClick("all")}
//             >
//               All
//             </Button>
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category.toUpperCase()}
//               </Button>
//             ))}
//           </div>
//         </form>
//       </CardHeader>
//       <CardContent>
//         {loading && <div className="text-center">Loading...</div>}
//         {error && <div className="text-center text-red-500">{error}</div>}
//         {!loading && !error && (
//           <ul className="space-y-4">
//             {paginatedQuestions.map((question) => (
//               <li key={question.id} className="border-b pb-2">
//                 <h3 className="font-semibold">{question.title}</h3>
//                 <p className="text-sm text-gray-600">Category: {question.category}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </CardContent>
//       <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2">
//         <Button
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//           className="flex items-center"
//         >
//           <ArrowLeft className="mr-2" /> Previous
//         </Button>
//         <span className="text-sm">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="flex items-center"
//         >
//           Next <ArrowRight className="ml-2" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Api from "@/lib/Api";
import SearchBar from "./SearchBar";

const categories = ["word",  "read", "sentence","mcq"];

export default function QuestionSearch() {
  const [selectedCategory, setSelectedCategory] = useState("word"); // Default to "word"

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

 // Check localStorage for the selected category or default to "word"
//  const [selectedCategory, setSelectedCategory] = useState(
//     () => localStorage.getItem("selectedCategory") || "word" // Initialize from localStorage
//   );

//   useEffect(() => {
//     // Save the selected category to localStorage whenever it changes
//     localStorage.setItem("selectedCategory", selectedCategory);
//   }, [selectedCategory]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary mb-4">Question Search</CardTitle>
        <SearchBar />
        <div className="flex flex-wrap gap-2 mt-2">
          {/* <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryClick("all")}
          >
            All
          </Button> */}
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
            >
              {category.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>

      {/* Pass selectedCategory to Api component */}
      <Api category={selectedCategory} />
    </Card>
  );
}
