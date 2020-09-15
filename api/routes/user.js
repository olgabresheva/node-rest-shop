const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.email, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        user: result,
                        message: 'User Created'
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

router.get('/userId', (req, res, next) => {
    User.findById(req.params.userId)
        .select('_id email password')
        .exec()
        .then(
            res.status(200).json({
                message: "User's deatils"
            }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;