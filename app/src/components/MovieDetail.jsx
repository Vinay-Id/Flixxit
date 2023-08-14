import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";
import MovieCard from "./MovieCard";
import VideoPlayer from "./VideoPlayer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AiFillPlayCircle,
  AiFillLike,
  AiFillDislike,
  AiOutlinePlus,
} from "react-icons/ai";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [userVote, setUserVote] = useState(0);
  const [allUserVote, setAllUserVote] = useState({});
  const [play, setPlay] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      fetchVote();
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [id]);

  const createMovieForUser = useCallback(async () => {
    try {
      await axios.post(`http://localhost:5000/api/movie/${id}`, {
        movieTitle: movieDetails.title,
        movieImage: `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`,
        user: userInfo._id,
      });
    } catch (error) {
      // console.error("Error creating movie:", error);
    }
  }, [id, movieDetails, userInfo]);

  const fetchRecommendedMovies = useCallback(async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
      );
      const recommendedMoviesWithImage = response.data.results.filter(
        (movie) => movie.backdrop_path
      );
      setRecommendedMovies(recommendedMoviesWithImage);
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  }, [id]);

  const fetchVote = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movie/${id}/votes/${userInfo._id}`
      );

      setUserVote(response.data.voteData.movieVote);

      const updatedVoteCount = {};
      response.data.allVoteData.forEach((vote) => {
        const movieVote = vote.movieVote;
        updatedVoteCount[movieVote] = (updatedVoteCount[movieVote] || 0) + 1;
      });

      setAllUserVote(updatedVoteCount);
    } catch (error) {
      console.error("Error fetching vote data:", error);
    }
  }, [id, userInfo._id]);

  const updateVoteType = async (movieVote) => {
    try {
      await axios.put(`http://localhost:5000/api/movie/vote/${id}`, {
        movieVote,
        user: userInfo._id,
      });

      setUserVote(movieVote);
      fetchVote();
    } catch (error) {
      console.error("Error updating vote type:", error);
    }
  };

  const addToWatchlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/watchlist/add",
        {
          userId: userInfo._id,
          data: movieDetails,
        }
      );

      toast.success(response.data.msg);
    } catch (error) {
      toast.error("Error adding movie to liked list");
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  useEffect(() => {
    if (movieDetails && userInfo) {
      createMovieForUser();
    }
  }, [movieDetails, userInfo, createMovieForUser]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  useEffect(() => {
    if (movieDetails) {
      fetchVote();
    }
  }, [fetchVote, movieDetails]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainDetailContainer">
      {!play ? (
        <div className="movie-details-container">
          <div className="image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className="margin-container">
            <h2>{movieDetails.title}</h2>
            <p className="movie-overview">{movieDetails.overview}</p>
            <div className="movie-details">
              <p>Release Date: {movieDetails.release_date}</p>
              <p>Vote Average: {movieDetails.vote_average}</p>
            </div>
            <button onClick={() => setPlay(!play)}>
              Watch <AiFillPlayCircle />
            </button>
            <button onClick={addToWatchlist}>
              Add <AiOutlinePlus />
            </button>
            <button onClick={() => updateVoteType(1)}>
              ({allUserVote[1] || 0}) 
               <span style={{ color: userVote === 1 ? "black" : "white" }}>
                <AiFillLike />
              </span>
            </button>
            <button onClick={() => updateVoteType(2)}>
              ({allUserVote[2] || 0})
              <span style={{ color: userVote === 2 ? "black" : "white" }}>
                <AiFillDislike />
              </span>
            </button>
            <div className="vote-buttons"></div>
          </div>
        </div>
      ) : (
        <>
          <VideoPlayer play={play} setPlay={setPlay} />
          <h2>{movieDetails.title}</h2>
        </>
      )}

      <h2>Recommended Movies</h2>
      <div className="recommended-movies-container">
        <div className="recommended-movies-list">
          {recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
