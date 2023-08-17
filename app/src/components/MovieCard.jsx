import React, { useState } from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, type, removeFromWatchlist }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleCardClick = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };
  return (
    <div
      className="movie-card"
      onClick={type === "watchlist" ? undefined : handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <video
          src={`/assets/Trailer.mp4`}
          autoPlay
          muted
          loop
          poster={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        ></video>
      ) : movie && movie.backdrop_path ? (
        <img
          // src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="no-poster">No Poster Available</div>
      )}
      <h2 id={type === "profile" ? "profileMovieTitle" : "movieTitle"}>
        {movie?.title || "Unknown Title"}
      </h2>
      {type === "watchlist" && (
        <div className="button-container">
          <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
          <button onClick={() => handleCardClick(movie)}>Detail</button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
