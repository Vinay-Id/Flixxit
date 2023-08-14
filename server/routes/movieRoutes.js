import express from "express";
import {
  createMovie,
  getUserMovies,
  getMovieVotes,
  updateMovieVote,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/:id", createMovie);
router.get("/all/:id", getUserMovies);
router.get("/:id/votes/:user", getMovieVotes);
router.put("/vote/:id", updateMovieVote);
router.delete("/delete/:user/:id", deleteMovie);

export default router;
