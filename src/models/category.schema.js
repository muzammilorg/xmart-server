import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    adminId: {type: mongoose.Schema.Types.ObjectId, ref: "admin"}

})



export const categoryModel = mongoose.model("category", categorySchema)