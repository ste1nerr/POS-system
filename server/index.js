import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {validationResult} from 'express-validator'
import { registerValidation } from "./validations/auth.js";

import UserModel from '../server/models/User.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.9srmsbp.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register',registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    
    const doc = new UserModel({
        email: req.body.email, 
        passwordHash, 
        fullName: req.body.fullName, 

    });

    const user = await doc.save();

    res.json(user);
});



app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok')
});