import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import axios from 'axios';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://queryquest-mern.vercel.app/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-4 space-y-6">
      {/* Search Bar */}
      <Card className="p-4 shadow-xl border border-gray-200">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
          </Button>
        </div>
      </Card>

      {/* Loading Shimmer */}
      {loading && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg border border-gray-100 transition-shadow animate-pulse"
            >
              <CardContent>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {results.map((result, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg border border-gray-100 transition-shadow"
            >
              <CardContent>
                <h3 className="text-lg font-medium text-gray-800">{result.title}</h3>
                <p className="text-gray-600 mt-2">{result.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {/* {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-500 mt-4">No results found for "{query}"</p>
      )} */}
    </div>
  );
};

export default SearchBar;