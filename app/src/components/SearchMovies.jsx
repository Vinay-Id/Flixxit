import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import "./SearchMovies.css";

const SearchMovies = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (query && query.trim() !== "") {
          const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
          const response = await axios.get(tmdbURL);
          const filteredResults = response.data.results.filter(
            (movie) => movie.backdrop_path
          );

          if (filteredResults.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
            setSearchResults(filteredResults);
          }
        }
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    fetchSearchResults();
  }, [query, apiKey]);

  return (
    <div className="search-results">
      {noResults ? (
        <h2>No movies found for "{query}"</h2>
      ) : (
        searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
};

export default SearchMovies;
