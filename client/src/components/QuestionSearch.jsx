
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Api from "@/lib/Api";
import SearchBar from "./SearchBar";

const categories = ["mcq","word","read", "sentence"];

export default function QuestionSearch() {
  const [selectedCategory, setSelectedCategory] = useState("mcq"); // Default to "word"

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
