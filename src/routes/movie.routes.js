import {Router} from 'express';

const movieRoutes = Router();

movieRoutes.route('/movies')
    .get(function(req, res) {
        res.send("movies!");
    });

export default movieRoutes;