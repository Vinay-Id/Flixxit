import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RenderMovies.css";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { fetchMoviesData } from "../slices/movieSlice";

const RenderMovies = ({ title, apiurl }) => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(apiurl);
        dispatch(fetchMoviesData(response.data.results));
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    }
    fetchMovies();
  }, [apiurl, dispatch]);
  
  const handleNext = () => {
    setMovies(prevMovies => [...prevMovies.slice(1), prevMovies[0]]);
  };

  const handlePrev = () => {
    setMovies(prevMovies => [
      prevMovies[prevMovies.length - 1],
      ...prevMovies.slice(0, -1),
    ]);
  };

  return (
    <div>
      <h2 className="Movie-title">{title}</h2>
      <div className="popular-movies-container">
        <button className="carousel-button prev" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="popular-movies-slider">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default RenderMovies;
