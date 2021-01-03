import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email must be valid.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password Confirm is required.'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same.'
        }
    },
    passwordChangedAt: Date,
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
