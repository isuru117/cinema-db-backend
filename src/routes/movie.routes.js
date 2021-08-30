import { Router } from 'express';
import MovieController from '../controllers/movie.controller';

const movieRoutes = Router();

movieRoutes.get('/movies/:query',MovieController.search);

export default movieRoutes;