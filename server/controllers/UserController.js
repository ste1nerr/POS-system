import { config } from 'dotenv';
config();
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'
import MenuModel from '../models/Menu.js'
import CartModel from '../models/Cart.js'

export const login = async (req, res) => {
    {
        try {
            // check for user in base
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
            // generate token
            const token = jwt.sign({ _id: user._id }, process.env.jwt_token, { expiresIn: '30d' }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            });


        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'failed to login'
            })
        }
    }

};

export const adminLogin = async (req, res) => {
    {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({
                    message: 'user is not found'
                })
            }
            const isValidPass = await bcrypt.compare(req.body.adminPassword, user._doc.adminPasswordHash)
            if (!isValidPass) {
                return res.status(400).json({
                    message: 'wrong login or password'
                })
            }


            const token = jwt.sign(
                {
                    _id: user._id
                }
                , process.env.jwt_token,
                {
                    expiresIn: '30d'
                });

            const { adminPasswordHash, ...userData } = user._doc;
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
    }

};

export const createUser = async (req, res) => {
    try {
        const cart = new CartModel({
            total: 0,
            dishes: []
        });

        const savedCart = await cart.save();
        // create menu
        const menu = new MenuModel({
            dishes: [{
                title: Math.floor(Math.random() * (1000000 - 0)) + 5,
                compositions: Math.floor(Math.random() * (1000000 - 0)) + 5,
                weight: Math.floor(Math.random() * (1000000 - 0)) + 5,
                cost: Math.floor(Math.random() * (1000000 - 0)) + 5,
                type: Math.floor(Math.random() * (1000000 - 0)) + 5
            }],
            cart: savedCart._id
        });

        const savedMenu = await menu.save();
        //hash password
        const salt = await bcrypt.genSalt(10)
        const adminPassword = req.body.adminPassword;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, salt)
        const adminHash = await bcrypt.hash(adminPassword, salt)
        //hash password
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullname: req.body.fullname,
            adminPasswordHash: adminHash,
            menu_id: savedMenu._id,
            cart_id: savedCart._id
        });


        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, process.env.jwt_token, { expiresIn: '30d' })
        console.log(token)
        const { passwordHash, adminPasswordHash, ...userData } = user._doc;
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
};

export const register = async (req, res) => {
    try {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const adminPassword = req.body.adminPassword;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, salt)
        const adminHash = await bcrypt.hash(adminPassword, salt)
        //hash password
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullname: req.body.fullname,
            adminPasswordHash: adminHash
        });
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, process.env.jwt_token, { expiresIn: '30d' })
        console.log(token)
        const { passwordHash, adminPasswordHash, ...userData } = user._doc;
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
};

export const profile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.jwt_token, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
    res.json({ token })

}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userID);
        if (!user) {
            return res.status(404).json({
                message: "user is not found"
            })
        }

        const { passwordHash, adminPasswordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'no access',
        })
    }
};
