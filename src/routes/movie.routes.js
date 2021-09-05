import { Router } from "express";
import MovieController from "../controllers/movie.controller.js";

const movieRoutes = Router();

movieRoutes.get("/movie/:query",MovieController.search);
movieRoutes.post("/movie/",MovieController.insert);

export default movieRoutes;