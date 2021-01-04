import AppError from '../../../javascript/dev/rest/05_jwt/api-tutorial/src/utils/appError.js';
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

const createGame = catchAsync(async (req, res, next) => {
    const newGame = await Game.create({
        name: req.body.name,
        description: req.body.description,
        genre: req.body.genre,
        developer: req.body.developer,
        engine: req.body.engine,
        platforms: req.body.platforms
    });

    res.status(201).json({
        status: 'success',
        data: { newGame }
    });
});

const getGame = catchAsync(async (req, res, next) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        return next(new AppError('No game found with this id!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { game }
    });
});

const gameController = {
    getAllGames,
    createGame,
    getGame
};

export default gameController;
