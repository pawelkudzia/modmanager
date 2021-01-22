import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const options = {
    timestamps: true
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: 3,
        maxlength: 20
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
        select: false // password will be not included in JSON result
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
}, options);

// document middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

// methods
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

const User = mongoose.model('User', userSchema);

export default User;
