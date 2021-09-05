import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const movieModel = mongoose.model("Movie", MovieSchema);

export default movieModel;