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
    firstname: { type: String, required: true }, // Add firstname field
    lastname: { type: String, required: true }, // Add lastname field
    street: { type: String, required: true }, // Add street field
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.model('Order', orderSchema);