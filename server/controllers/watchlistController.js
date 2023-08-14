import User from "../models/watchlistModel.js";

const handleError = (res, error, message) => {
  console.error(error);
  return res.status(500).json({ msg: message || "Internal server error." });
};

export const getLikedMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res.json({
        msg: "User with given userId not found.",
        movies: {
          id: 9952549697,
          title: "No Movie",
          backdrop_path: "https://via.placeholder.com/150",
        },
      });
    }
  } catch (error) {
    handleError(res, error, "Error fetching movies.");
  }
};

export const addToLikedMovies = async (req, res) => {
  try {
    const { userId, data } = req.body;
    let user = await User.findOne({ userId });

    if (!user) {
      user = await User.create({ userId, likedMovies: [data] });
      return res.json({ msg: "Movie successfully added to watch list." });
    }

    const { likedMovies } = user;
    const movieAlreadyLiked = likedMovies.some(({ id }) => id === data.id);

    if (!movieAlreadyLiked) {
      user.likedMovies.push(data);
      await user.save();
      return res.json({ msg: "Movie successfully added to watch list." });
    } else {
      return res.json({ msg: "Movie already added to the watch list." });
    }
  } catch (error) {
    handleError(res, error, "Error adding movie to the watch list");
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "User with the given userId not found." });
    }

    const { likedMovies } = user;
    const updatedMovies = likedMovies.filter(({ id }) => id !== movieId);

    user.likedMovies = updatedMovies;
    await user.save();

    return res.json({
      msg: "Movie successfully removed.",
      movies: updatedMovies,
    });
  } catch (error) {
    handleError(res, error, "Error removing movie from the watch list.");
  }
};
