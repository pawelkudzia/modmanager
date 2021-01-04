import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import AppError from './utils/appError.js';
import testRouter from './routes/testRoutes.js';
import userRouter from './routes/userRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import modRouter from './routes/modRoutes.js';


// app init
dotenv.config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 8080;


// database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database!'));


// middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// api
app.use('/api/v1/test', testRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/mods', modRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});


// server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}.`));
