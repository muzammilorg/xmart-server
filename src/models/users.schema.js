import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String, default: ""},
    otp: {
        value: {type: String},
        expireAt: {type: Date},
        verified: {type: Boolean, default: false}
    },
    role: {type: String, default: "user", enum: ["user", "admin"]}
})


export const userModel = mongoose.model('user', userSchema);