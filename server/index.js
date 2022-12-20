import { config } from 'dotenv';
config();

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as UserController from '../server/controllers/UserController.js'



import { registerValidation } from "./validations/auth.js";
import checkAuth from '../server/utils/checkAuth.js'

mongoose.connect(`mongodb+srv://${process.env.username_DB}:${process.env.password_DB}@cluster0.9srmsbp.mongodb.net/${process.env.name_DB}?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());


app.post('/auth/login', UserController.login)

app.post('/auth/adminLogin', UserController.adminLogin)

app.post('/auth/register', registerValidation, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)


app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok')
});