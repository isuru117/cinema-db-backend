import { Router } from "express";
import MovieController from "../controllers/movie.controller.js";
import { movieBodyValidator, stringQueryValidator } from "../utils/validation.util.js";

// Routes with input validation to be passed to the controller

const movieRoutes = Router();

movieRoutes.get("/movie/:query",stringQueryValidator,MovieController.search);
  
movieRoutes.post("/movie/",movieBodyValidator,MovieController.insert);

export default movieRoutes;