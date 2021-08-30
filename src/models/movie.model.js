import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
    name: String,
    description: String
}, {
    timestamps: true
});

export default mongoose.model('Movie', MovieSchema);