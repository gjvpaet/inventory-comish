const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    let { Email, Password } = req.body;

    try {
        let existingUser = await User.find({ email: Email }).exec();

        if (existingUser.length) {
            res.status(409).json({ message: 'Email already exist.' });
        } else {
            bcrypt.hash(Password, 10, async (err, hash) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    try {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: Email,
                            password: hash
                        });

                        await user.save();

                        res.status(201).json({ message: 'Successfully signed up.' });
                    } catch (error) {
                        console.log('error: ', error);
                        res.status(500).json({ error });
                    }
                }
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
