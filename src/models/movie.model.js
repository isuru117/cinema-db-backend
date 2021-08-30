import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
    name: String,
    description: String
}, {
    timestamps: true
});

const movieModel = mongoose.model('Movie', MovieSchema);

export default movieModel;