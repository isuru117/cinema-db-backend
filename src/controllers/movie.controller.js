import MovieModel from "../models/movie.model.js";
import StatusCodes from "http-status-codes";

const MovieController = {};

MovieController.search = async (req, res) => {

  if (!req.query) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
  }

  MovieModel.find({ "name": new RegExp(`.*${req.params.query}.*`, "i") }).then(data => {
    console.log(data);
    if (data.length > 0) {
      data = data.map(item => ({
        "id": item._id,
        "name": item.name,
        "description": item.description,
      }));
      return res.status(StatusCodes.OK).send(data);
    }
    else {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "No movies exist matching given query" });
    }
  }).catch(() => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while retreiving movie");
  });
};

MovieController.insert = async (req, res) => {

  if (!req.body || !req.body.name || !req.body.description) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
  }

  MovieModel.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(result => {
      return res.status(StatusCodes.OK).send({
        id: result._id,
        name: result.name,
        description: result.description,
        status: "success",
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while inserting movie");
    });
};

export default MovieController;