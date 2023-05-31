import { config } from 'dotenv';
config();
import cors from 'cors'
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';

import * as storageController from '../server/controllers/storageController.js'
import * as cartController from '../server/controllers/cartController.js'
import * as UserController from '../server/controllers/UserController.js'
import * as DishController from '../server/controllers/DishController.js'
import * as menuController from '../server/controllers/menuController.js'
import * as orderController from '../server/controllers/orderController.js'

import { registerValidation, loginAdminValidation, loginValidation, dishCreateValidation } from "./validations/validations.js";
import checkAuth from '../server/utils/checkAuth.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect(`mongodb+srv://${process.env.username_DB}:${process.env.password_DB}@cluster1.aepm60m.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

//USERS
app.get('/profile', UserController.profile)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/admin',loginAdminValidation, UserController.adminLogin)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.createUser)
app.get('/auth/me', checkAuth, UserController.getMe)



//DISHES
// // ====================
app.get('/dishes', DishController.getAllDishes);
app.post('/dishes1',checkAuth ,dishCreateValidation,DishController.create);
app.delete('/dishes/:id', checkAuth , DishController.remove);
app.patch('/dishes/:id', DishController.update);
// // ====================



//MENU
// // ====================
// app.post('/menu/createMenu', menuController.createMenu);
app.post('/menu/AddDish/:menuid', menuController.AddDish);
// app.get('/menu/removeDish', menuController.RemoveDish);
app.get('/menu', menuController.getAll);
app.get('/menu/:menu_id', menuController.OutputDish);
app.post('/menu/remove/:menu_id', menuController.removeDishFromMenu);
app.post('/menu/update/:menu_id')
// app.post('/menu/create/:menu_id', menuController.AddDish);


//CART
// ====================
app.post('/cart/add', cartController.addToCart)
//app.post('/cart/:cart_id/items/:menu_id', cartController.addToCart);
app.post('/cart/add/:menu_id/:cart_id', cartController.addToCart);
app.get('/cart/:cart_id', cartController.getCartById)
app.post('/cart/updateQuant/:cart_id', cartController.updateCart)
app.post('/cart/removeDish/:cart_id', cartController.removeDishFromCart)
app.post('/cart/confirmOrder/:cart_id', orderController.createOrder)
app.get('/cart/check/:cart_id', cartController.checkEmptyOrNo)
// // ====================


//ORDERS
// // ====================
app.get('/orders/:user_id', orderController.findOrdersByUserId);
//======================


//STORAGE
// // ====================
app.get('/storage/get/:user_id', storageController.getIngredientByUserId);
app.post('/storage/create/:user_id', storageController.createIngredient);
app.post('/storage/delete/:user_id', storageController.deleteIngredient)
//======================




app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server ok')
});


