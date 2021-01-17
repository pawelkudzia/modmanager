import Mod from '../models/modModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// endpoint handlers
const getAllMods = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Mod.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const mods = await features.query;

    res.status(200).json({
        status: 'success',
        results: mods.length,
        data: { mods }
    });
});

const createMod = catchAsync(async (req, res, next) => {
    const newMod = await Mod.create({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        game: req.body.game
    });

    res.status(201).json({
        status: 'success',
        data: { newMod }
    });
});

const getMod = catchAsync(async (req, res, next) => {
    const mod = await Mod.findById(req.params.id);

    if (!mod) {
        return next(new AppError('No mod found with this id!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { mod }
    });
});

const updateMod = catchAsync(async (req, res, next) => {
    const mod = await Mod.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!mod) {
        return next(new AppError('No mod found with this id!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { mod }
    });
});

const deleteMod = catchAsync(async (req, res, next) => {
    await Mod.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

const modController = {
    getAllMods,
    createMod,
    getMod,
    updateMod,
    deleteMod
};

export default modController;
