import MovieModel from "../models/movie.model";
import StatusCodes from 'http-status-codes';

const MovieController = {}

MovieController.search = async (req, res) => {
    MovieModel.find({ "name": { $regex: '.*' + req.query.query + '.*' } }).then((data) => {
        if (data) {
            res.status(StatusCodes.OK).send(data);
        }

    }).catch(()=>{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    });
}

export default MovieController;