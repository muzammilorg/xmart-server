import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    products: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
        quantity: {type: Number, required: true}
    }],
    totalAmount: {type: Number, required: true},
    paymentMethod: {type: String, default: "Cash On Delivey"},
    status: {type: String, default: "Pending", enum: ["Pending", "Processing", "Shipped","Delivered","Cancelled"]},
    createdAt: {type: Date, default: Date.now}

})


export const orderModel = mongoose.model("order", orderSchema)