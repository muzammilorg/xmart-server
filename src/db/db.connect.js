import mongoose, { connect } from "mongoose";

export default async function connectDb(uri) {

    try {

        await mongoose.connect(uri)
        console.log('Database Connected')
        
    } catch (error) {
        console.log('Database Connection Failed', error)
    }
    
}