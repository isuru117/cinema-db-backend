import StatusCodes from "http-status-codes";
import MovieService from "../services/movie.service.js";

const MovieController = {

  search(req, res) {
    if (!req.params.query) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
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
    if (!req.body || !req.body.name || !req.body.description) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
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