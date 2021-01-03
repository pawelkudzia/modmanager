import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import testRouter from './routes/testRoutes.js';


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

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can not find ${req.originalUrl} on this server!`
    });
});


// server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}.`));
