import React, { useState, useEffect } from "react";
import "./WatchlistPage.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { BarLoader } from "react-spinners"; 
const Watchlist = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          `/api/watchlist/liked/${userInfo._id}`
        );
        setMovies(response.data.movies);
        setLoading(false); 
      } catch (error) {
        console.log("Error fetching watchlist");
        setLoading(false); 
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

  return (
    <div className="watchlist-container">
      <h1>Watchlist</h1>
      {loading ? (
        <div className="loading-spinner"><BarLoader color="#ff464f" /></div>
      ) : (
        <div className="cardContainer">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                type="watchlist"
                removeFromWatchlist={removeFromWatchlist}
              />
            ))
          ) : (
            <h2>Your watchlist is empty.</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
