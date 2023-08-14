import React, { useState } from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
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
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <video
          src={`/assets/Trailer.mp4`} 
          // src={`https://www.w3schools.com/html/mov_bbb.mp4`} 
          autoPlay
          muted
          loop
          poster={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        ></video>
      ) : movie && movie.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="no-poster">No Poster Available</div>
      )}
      <h2 id="movieTitle">{movie?.title || "Unknown Title"}</h2>
    </div>
  );
};

export default MovieCard;


