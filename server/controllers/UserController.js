import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'

export const login = async (req, res) => {
    {
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
                , 'secret',
                {
                    expiresIn: '30d'
                });

            const {adminPasswordHash, ...userData } = user._doc;
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



export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json(errors.array());
        }

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
        }, 'secret', { expiresIn: '30d' })

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


export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userID);
        if(!user){
            return res.status(404).json({
                message: "user is not found"
            })
        }

        const { passwordHash, adminPasswordHash, ...userData } = user._doc;

        res.json(userData);
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'no access',
        })
    }
};
