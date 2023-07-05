import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    dishes: [{
        title: {type: String},
        compositions: {type: String},
        cost: {type: Number},
        quantity: { type: Number, required: true, default: 1, },
    }],
    total: { type: Number, required: true, default: 0, },
});


export default mongoose.model('Cart', cartSchema);