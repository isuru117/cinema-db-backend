import { validationResult } from "express-validator";
import StatusCodes from "http-status-codes";
import MovieService from "../services/movie.service.js";

const MovieController = {

  search(req, res) {

    // process input validation received from router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    MovieService.search(req.params.query).then(data => {
      if (data) {
        return res.status(StatusCodes.OK).send(data);
      }
      else {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "No movies exist matching given query" });
      }
    }).catch(() => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while retreiving movie");
    });
  },

  insert(req, res) {

    // process input validation received from router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    MovieService.insert({
      name: req.body.name,
      description: req.body.description,
    })
      .then(result => {
        return res.status(StatusCodes.OK).send(result);
      })
      .catch(() => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while inserting movie");
      });
  },
};

export default MovieController;