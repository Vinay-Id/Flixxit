import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./CategoryPage.css";
import MovieCard from "../components/MovieCard";

const selectGenreData = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
};

const CategoryPage = () => {
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMoviesByGenre = useCallback(async (genreId, page) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = genreId
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
      const response = await axios.get(url);

      if (page === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(
            (movie) =>
              !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
      }
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  }, []);
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setPage(1); 
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMoviesByGenre(selectedGenre, nextPage);
  };

  useEffect(() => {
    const options = Object.entries(selectGenreData).map(([value, label]) => ({
      value,
      label,
    }));
    setGenreOptions(options);
  }, []);

  useEffect(() => {
    fetchMoviesByGenre(selectedGenre, page);
  }, [selectedGenre, page, fetchMoviesByGenre]);

  return (
    <div className="category-page">
      <h1>Category</h1>
      <div className="category-dropdown">
        <label htmlFor="genre-select">Select a Genre: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genreOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="load-more-container">
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
