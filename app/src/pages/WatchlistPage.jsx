import React, { useState, useEffect } from "react";
import "./WatchlistPage.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { BounceLoader } from "react-spinners";
const Watchlist = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          `/api/watchlist/liked/${userInfo._id}`
        );
        setMovies(response.data.movies);
        setHovered(Array(response.data.movies.length).fill(false));
      } catch (error) {
        console.log("Error fetching watchlist");
      }
    };
    fetchWatchlist();
  }, [userInfo._id]);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.put("/api/watchlist/remove", {
        userId: userInfo._id,
        movieId: movieId,
      });
      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      setMovies(updatedMovies);
      toast.success("Movie removed from watchlist");
    } catch (error) {
      toast.error("Error removing movie from watchlist");
    }
  };

  const handleCardClick = (movie) => {
    if (movie && movie.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className="watchlist-container">
      
      <h1>Watchlist</h1>
      <div className="cardContainer">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`movie-card ${hovered[index] ? "hovered" : ""}`}
              onMouseEnter={() => {
                const updatedHovered = [...hovered];
                updatedHovered[index] = true;
                setHovered(updatedHovered);
              }}
              onMouseLeave={() => {
                const updatedHovered = [...hovered];
                updatedHovered[index] = false;
                setHovered(updatedHovered);
              }}
            >
              {movie.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-poster">No Poster Available</div>
              )}
              <h3 id="movieTitle">{movie?.title || "Unknown Title"}</h3>
              <div className="button-container">
                <button onClick={() => removeFromWatchlist(movie.id)}>
                  Remove
                </button>
                <button onClick={() => handleCardClick(movie)}>Detail</button>
              </div>
            </div>
          ))
        ) : (
          <div className="suggested-programs">
            <h2>No movies</h2>
          </div>
          // </div>:<BounceLoader color="rgba(255, 7, 7, 1)" />
        )}
      </div>
    </div>
  );
};

export default Watchlist;
