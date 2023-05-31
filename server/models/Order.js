import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true },
    dishes: [{
        title: { type: String, required: true },
        cost: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
    }],
    total: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);