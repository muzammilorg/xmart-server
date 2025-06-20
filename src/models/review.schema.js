import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    review: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}

})


export const reviewModel = mongoose.model('review', reviewSchema)