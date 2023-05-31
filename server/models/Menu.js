import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  dishes: [{
    title: { type: String, unique: false },
    compositions: { type: String },
    weight: { type: Number },
    cost: { type: Number },
    type: { type: String },
    quantity: { type: Number, default: 1 }
  }],
});


export default mongoose.model('Menu', MenuSchema);

