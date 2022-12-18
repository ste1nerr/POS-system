import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator'
import { registerValidation } from "./validations/auth.js";

import UserModel from '../server/models/User.js'
import checkAuth from '../server/utils/checkAuth.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.9srmsbp.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());


app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'user is not found'
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: 'wrong login or password'
            })
        }


        const token = jwt.sign(
            {
                _id: user._id
            }
            , 'secret',
            {
                expiresIn: '30d'
            });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to login'
        })
    }
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json(errors.array());
        }

        //hash password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        //hash password

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullname: req.body.fullname,
        });
        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, 'secret', { expiresIn: '30d' })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to register',
        })
    }
});

app.get('/auth/me', checkAuth,(req, res) => {
    try{
        
    }catch(err) {}
})

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok')
});