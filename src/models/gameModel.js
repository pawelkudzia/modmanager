import mongoose from 'mongoose';
import Mod from './modModel.js';

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

// document middleware
gameSchema.pre('findOneAndDelete', async function (next) {
    const currentDocument = await this.model.findOne(this.getQuery());
    await Mod.deleteMany( { game: currentDocument._id } );

    next();
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
