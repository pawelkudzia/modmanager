import mongoose from 'mongoose';

const options = {
    timestamps: true
};

const modSchema = new mongoose.Schema({
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
    author: {
        type: String,
        minlength: 3,
        maxlength: 100,
        default: undefined
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, 'Game is required.'],
    }
}, options);

const Mod = mongoose.model('Mod', modSchema);

export default Mod;
