import mongoose from "mongoose";


const DishSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    compositions: {type: String,}, 
    weight: {type: Number, required: true},
    cost: {type: Number, required: true},

}, {timestamps: true}, );

export default mongoose.model('Dish', DishSchema);
