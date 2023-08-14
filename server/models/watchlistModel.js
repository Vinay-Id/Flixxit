import mongoose from 'mongoose';
const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  likedMovies: Array,
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist;
