import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_LOCAL;

// database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database!'));

// read data from JSON file
const users = JSON.parse(
    fs.readFileSync('./src/dev/users.json', 'utf-8')
);

const importData = async () => {
    try {
        await User.create(users);
        console.log('Users data was imported into database.');
    } catch (error) {
        console.error('Something went wrong and users data could not be imported into database.');
        console.error(error);
    }

    process.exit();
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log('Users data was deleted from database.');
    } catch (error) {
        console.error('Something went wrong and users data could not be deleted from database.');
    }

    process.exit();
};

// commandline options
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
