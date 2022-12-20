import mongoose from "mongoose";


const DishSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    compositions: {type: String,}, 
    weight: {type: Float64Array, require: true},
    cost: {type: Float64Array, required: true},

}, {timestamps: true}, );

export default mongoose.model('User', UserSchema);


body('title', 'enter the name of the dish').isLength({min:2}).isString(),
body('compositions', 'enter the name of the element').isLength({min:2}).isString().optional(),
body('weight', 'enter the weight of the dish').isLength({min:1}).isFloat(),
body('cost', 'enter the price of the dish').isLength({min:1}).isFloat(),