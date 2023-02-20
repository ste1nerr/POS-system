import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    dishes: [{
        title: {type: String, required: true, unique: true},
        compositions: {type: String,}, 
        weight: {type: Number, required: true},
        cost: {type: Number, required: true},
        type: {type: String, required: true},
    }]
  });

export default mongoose.model('Menu', MenuSchema);