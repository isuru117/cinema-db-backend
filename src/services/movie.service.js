import MovieModel from "../models/movie.model.js";

const MovieService = {
  find(searchQuery) {
    return MovieModel.find({ "name": new RegExp(`.*${searchQuery}.*`, "i") }).then(data => {
      if (data.length > 0) {
        data = data.map(item => ({
          "id": item._id,
          "name": item.name,
          "description": item.description,
        }));
        return data;
      }
      else {
        return null;
      }
    }).catch(error => {
      console.log(error);
      throw error;
    });
  },

  insert(movieInfo) {
    return MovieModel.create({
      name: movieInfo.name,
      description: movieInfo.description,
    })
      .then(result => {
        return {
          id: result._id,
          name: result.name,
          description: result.description,
          status: "success",
        };
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  },
};

export default MovieService;