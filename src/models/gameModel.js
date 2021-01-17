import mongoose from 'mongoose';

const options = {
    timestamps: true
};

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: 3,
        maxlength: 1000
    },
    genre: {
        type: String,
        required: [true, 'Genre is required.'],
        enum: ['Action', 'Adventure', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy', 'Misc'],
        default: 'Misc'
    },
    developer: {
        type: String,
        minlength: 3,
        maxlength: 100,
        default: undefined
    },
    engine: {
        type: String,
        minlength: 3,
        maxlength: 100,
        default: undefined
    },
    platforms: {
        type: [String],
        default: undefined
    }
}, options);

const Game = mongoose.model('Game', gameSchema);

export default Game;
