import {v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import Constants from '../constants.js'

cloudinary.config(
    {
        cloud_name: Constants.CLOUD_NAME,
        api_key: Constants.API_KEY,
        api_secret: Constants.API_SECRET
    }
)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "xmart",
        allowedFormats: ['jpg', 'png', 'jpeg'],

    }
})

export {cloudinary, storage}