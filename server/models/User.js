import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    fullname: {type: String, require: true},
    adminPasswordHash: {type: String, required: true},
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
}, {timestamps: true}, );

export default mongoose.model('User', UserSchema);

