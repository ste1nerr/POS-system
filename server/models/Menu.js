import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    dishes: [{
        title: {type: String},
        compositions: {type: String}, 
        weight: {type: Number},
        cost: {type: Number},
        type: {type: String},
    }]
  });

export default mongoose.model('Menu', MenuSchema);