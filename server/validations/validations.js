import {body} from 'express-validator'

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min:5}),
];

export const loginAdminValidation = [
    body('email').isEmail(),
    body('adminPassword').isLength({min:5}),
];

export const registerValidation= [
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('fullname').isLength({min:4}),
    body('adminPassword').isLength({min:5}),
];


export const dishCreateValidation = [
    body('title', 'enter the name of the dish').isLength({min:2}).isString(),
    body('compositions', 'enter the name of the element').isLength({min:2}).isString().optional(),
    body('weight', 'enter the weight of the dish').isLength({min:1}).isNumeric(),
    body('cost', 'enter the price of the dish').isLength({min:1}).isNumeric(),
];