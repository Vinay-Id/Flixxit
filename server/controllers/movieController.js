import Movie from "../models/movieModel.js";

const handleError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message: message || "Internal server error." });
};

export const createMovie = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const { movieTitle, movieImage, user } = req.body;

    const userExists = await Movie.exists({ user, movieTitle });

    if (!userExists) {
      const newMovie = new Movie({
        user,
        movieId,
        movieTitle,
        movieImage,
      });

      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } else {
      res.status(200).json({ message: "Movie already exists." });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserMovies = async (req, res) => {
  try {
    const { id: user } = req.params;

    const userMovies = await Movie.find({ user });

    if (userMovies.length >= 0) {
      res.status(200).json(userMovies);
    } else {
      res.status(404).json({ message: "No movies found for the user." });
    }
  } catch (error) {
    handleError(res, error, "Error while fetching user movies.");
  }
};

export const getMovieVotes = async (req, res) => {
  try {
    const { id: movieId, user } = req.params;

    const voteData = await Movie.findOne({ movieId, user });
    const allVoteData = await Movie.find({ movieId });

    if (voteData) {
      res.status(200).json({ voteData, allVoteData });
    } else {
      res
        .status(404)
        .json({ message: "No vote data found for the user and movie." });
    }
  } catch (error) {
    handleError(res, error, "Error while fetching vote data.");
  }
};

export const updateMovieVote = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const { movieVote, user } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { movieId, user },
      { movieVote },
      { new: true }
    );

    if (updatedMovie) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ message: "Movie not found." });
    }
  } catch (error) {
    handleError(res, error, "Error updating voteType.");
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { user, id: movieId } = req.params;
    const deletedMovie = await Movie.findOneAndDelete({ movieId, user });

    if (deletedMovie) {
      res.status(200).json({ message: "Movie deleted successfully." });
    } else {
      res.status(404).json({ message: "Movie not found for the user." });
    }
  } catch (error) {
    handleError(res, error, "Error deleting movie.");
  }
};
