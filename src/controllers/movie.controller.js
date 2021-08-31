import MovieModel from "../models/movie.model";
import StatusCodes from 'http-status-codes';

const MovieController = {}

MovieController.search = async (req, res) => {

    if(!req.query){
        return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
    }

    MovieModel.find({ "name": { $regex: '.*' + req.query + '.*' } }).then((data) => {
        if (data) {
            return res.status(StatusCodes.OK).send(data);
        }
    }).catch(() => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while retreiving movie");
    });
}

MovieController.insert = async (req, res) => {

    if(!req.body || !req.body.name || !req.body.name){
        return res.status(StatusCodes.BAD_REQUEST).send("Missing required parameters");
    }

    MovieModel.create({
        name: req.body.name,
        description: req.body.description
    })
    .then((result)=>{
        return res.status(StatusCodes.OK).send({
            id: result._id,
            name: result.name,
            description: result.description,
            status: "success"
        });
    })
    .catch((error)=>{
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("An error occured while inserting movie");
    });
}

export default MovieController;