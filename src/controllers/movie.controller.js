import movieModel from "../models/movie.model";

export const read = () => movieModel.find();