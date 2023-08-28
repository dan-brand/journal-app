// --------------------------------- IMPORTS --------------------------------- //
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --------------------------------- JWT FUNCTION --------------------------------- //

const createToken = function(userId) {
    return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: '3d' })
}

// --------------------------------- REGISTER --------------------------------- //

const registerUser = async (req, res, next) => {

    const { email, password } = req.body;

    if ( !email || !password ) { 
        return next(new Error('Provide email and password'));
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        return next(new Error('Email already in use'));
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash })
        const token = createToken(user._id)
        res.status(201).json({ email: user.email, userId: user._id, token })  
    } catch(error) {
        next(error)
    }

}

// --------------------------------- LOGIN --------------------------------- //

const loginUser = async (req, res, next) => {
 
    const { email, password } = req.body;

    if ( !email || !password ) { 
        return next(new Error('Provide email and password'));
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new Error('No user exists'));
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return next(new Error('Incorrect email or password'));
        }

        const token = createToken(user._id)
        res.status(200).json({ email: user.email, userId: user._id, token }) 
    } catch(error) {
        res.status(400).json({ error })
    }
}

// --------------------------------- EXPORT --------------------------------- //

module.exports = { registerUser, loginUser }