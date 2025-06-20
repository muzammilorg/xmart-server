import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }

})



export const productModel = mongoose.model("product", productSchema)