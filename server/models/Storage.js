import mongoose from "mongoose";
const storageSchema = new mongoose.Schema({
    ingredientName: { type: String, required: true, },
    quantity: { type: Number, required: true, },
    unit: { type: String, required: true, },
    minQuantity: { type: Number, required: true, },
    maxQuantity: { type: Number, required: true, },
    supplier: { type: String, required: true, },
    pricePerUnit: { type: Number, required: true, },
    deliveryDate: { type: Date, required: true, },
    expirationDate: { type: Date, required: true, },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


export default mongoose.model('Storage', storageSchema);