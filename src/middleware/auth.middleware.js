import jwt from 'jsonwebtoken'
import {userModel} from '../models/users.schema.js'
import Constants from '../constants.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")?.[1];
    
    console.log(token, '<==== Token')
    if (!token) {
        return   res.status(401).json({message: "User Unauthorize", status: 'failed'})
    }

    try {

        const decode = jwt.verify(token, Constants.JWT)
        console.log(decode, '<---Decode');
        
        const user = await userModel.findById(decode?.user?.id);
        
        if (!user) {
            return res.status(404).json({message: 'User Not Found', status: 'failed'})
        }

        req.user = user;
        next()

    } catch (error) {
        return   res.status(401).json({message: "Token is Not Valid", status: 'failed'})
        
    }
}

const checkAdminMiddleware = async (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({message: 'Access Denied Admin Only', status: 'failed'})
    }

    next();
}

export {authMiddleware, checkAdminMiddleware}