import Game from '../models/gameModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

// endpoint handlers
const getAllGames = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Game.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const games = await features.query;

    res.status(200).json({
        status: 'success',
        results: games.length,
        data: { games }
    });
});

const gameController = {
    getAllGames
};

export default gameController;
