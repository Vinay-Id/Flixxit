import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  user: { type: String, required: true },
  movieId: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  movieImage: { type: String, required: true },
  movieVote: { type: Number, default: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
