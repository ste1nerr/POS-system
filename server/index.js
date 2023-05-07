import { config } from 'dotenv';
config();
import cors from 'cors'
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';


import * as cartController from '../server/controllers/cartController.js'
import * as UserController from '../server/controllers/UserController.js'
import * as DishController from '../server/controllers/DishController.js'
import * as menuController from '../server/controllers/menuController.js'


import { registerValidation, loginAdminValidation, loginValidation, dishCreateValidation } from "./validations/validations.js";
import checkAuth from '../server/utils/checkAuth.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect(`mongodb+srv://${process.env.username_DB}:${process.env.password_DB}@cluster0.9srmsbp.mongodb.net/${process.env.name_DB}?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


app.get('/profile', UserController.profile)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/adminLogin',loginAdminValidation, UserController.adminLogin)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.createUser)
app.get('/auth/me', checkAuth, UserController.getMe)

// // ====================

app.get('/dishes', DishController.getAllDishes);
app.post('/dishes1',checkAuth ,dishCreateValidation,DishController.create);
app.delete('/dishes/:id', checkAuth , DishController.remove);
app.patch('/dishes/:id', DishController.update);


// // ====================
// app.post('/menu/createMenu', menuController.createMenu);
app.post('/menu/AddDish/:menuid', menuController.AddDish);
// app.get('/menu/removeDish', menuController.RemoveDish);
app.get('/menu', menuController.getAll);
app.get('/menu/:menu_id', menuController.OutputDish);

// ====================
app.post('/cart/add', cartController.addToCart)
//app.post('/cart/:cart_id/items/:menu_id', cartController.addToCart);
app.post('/cart/add/:menu_id/:cart_id', cartController.addToCart);
app.get('/cart', cartController.getCart)

// // ====================
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok')
});