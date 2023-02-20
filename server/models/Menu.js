import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dishes: [{
        title: {type: String, required: true, unique: true},
        compositions: {type: String,}, 
        weight: {type: Number, required: true},
        cost: {type: Number, required: true},
        type: {type: String, required: true},
    }]
  });

export default mongoose.model('Menu', MenuSchema);