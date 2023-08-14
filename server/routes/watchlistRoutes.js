import express from "express";
const router = express.Router();

import {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} from "../controllers/watchlistController.js";

router.get("/liked/:userId", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);

export default router;
