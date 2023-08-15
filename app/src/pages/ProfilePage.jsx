import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import MovieCard from "../components/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { logout } from "../slices/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [watched, setWatched] = useState([]);
  const [suggestedMovie, setSuggestedMovie] = useState([]);
  const [logoutApiCall] = useLogoutMutation();
  const checkMember = useSelector((state) => state.myMovie.plusUser);
  const [updateProfile] = useUpdateUserMutation();
  const selectPreference = {
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

  const getMovieForUser = async () => {
    try {
      const response = await axios.get(`/api/movie/all/${userInfo._id}`);
      setWatched(response.data);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  const fetchMoviesByPreferencs = useCallback(async (genreId) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
      if (genreId) {
        url += `&with_genres=${genreId}`;
      }
      const response = await axios.get(url);
      const filteredResults = response.data.results.filter(
        (movie) => movie.backdrop_path
      );
      setSuggestedMovie(filteredResults);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  }, []);

  useEffect(() => {
    getMovieForUser();
    fetchMoviesByPreferencs(userInfo.preference);
  }, [userInfo.preference, fetchMoviesByPreferencs]);

  const handleDelete = async (movieId) => {
    try {
      const response = await axios.delete(
        `/api/movie/delete/${userInfo._id}/${movieId}`
      );
      toast.success(response.data.message);
      getMovieForUser();
    } catch (error) {
      toast.error("Error deleting movie:", error);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const submitHandler = async (Interests, member) => {
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        preference: Interests,
        jwt: userInfo.jwt,
        membership: member,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logout");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-info">
        {/* Account Information */}
        <div className="profile-section">
          <h2>Account Information</h2>
          <p>
            Name: {userInfo.name || "user"}{" "}
            {userInfo.membership === "Plus" && (
              <span className="glowing-badge">Plus</span>
            )}
          </p>
          <p>Email: {userInfo.email || "johndoe@example.com"}</p>
          <p>Preference: {selectPreference[userInfo.preference] || "Action"}</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
        {/* Interests and Preferences */}
        <div className="profile-section">
          <h2>Interests and Preferences</h2>
          <div className="preferences-form">
            <label>Favorite Genres: </label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              {Object.entries(selectPreference).map(([id, genre]) => (
                <option key={id} value={id}>
                  {genre}
                </option>
              ))}
            </select>
            <button
              onClick={() => submitHandler(selectedGenre, userInfo.membership)}
            >
              Save Preferences
            </button>
          </div>
          {/* Suggestions Based on Your Interests */}
          <div className="suggestions-section">
            <h2>Suggestions Based on Your Interests</h2>
            <div className="suggestions-list" style={{ color: "black" }}>
              {suggestedMovie.slice(0, 3).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
        {/* Become Flixxit Plus Member */}
        {userInfo.membership === "NotPlus" ? (
          <div className="profile-section">
            <h2>Become Flixxit Plus Member</h2>
            <p>Upgrade your account to enjoy premium features.</p>
            <Link to="/payment" className="become-member-button">
              Become Flixxit Plus Member
            </Link>
          </div>
        ) : (
          <div className="profile-section">
            <h2>Cancel Flixxit Plus Membership</h2>
            <p>
              You are currently a Flixxit Plus member, enjoying premium
              features.{" "}
            </p>
            <button
              onClick={() => submitHandler(userInfo.preference, "NotPlus")}
              className="become-member-button"
            >
              Cancel Flixxit Plus Membership
            </button>
          </div>
        )}
        {/* Content Consumed */}
        <div className="profile-section">
          <h2>Content Consumed</h2>
          {watched.length > 0 ? (
            <div className="content-list">
              {watched.map((movie) => (
                <div className="contentList" key={movie.movieTitle}>
                  <img src={movie.movieImage} alt={movie.movieTitle} />
                  <h2>{movie.movieTitle}</h2>
                  {/* {console.log(movie)} */}
                  <button onClick={() => handleDelete(movie.movieId)}>
                    remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
