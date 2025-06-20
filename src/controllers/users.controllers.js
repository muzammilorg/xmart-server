import { userModel } from "../models/users.schema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Constants from "../constants.js";
import sendMail from "../utilities/email.send.js";



export default class Users {
    static async signup(req, res) {
        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required', status: 'failed' })
            }

            const existingUser = await userModel.findOne({ email })

            if (existingUser) {
                return res.status(409).json({ message: 'Email already exist', status: 'failed' })

            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            })

            await newUser.save();

            const payload = {
                user: {
                    id: newUser._id
                }
            }

            const token = jwt.sign(
                payload,
                Constants.JWT,
                { expiresIn: "1y" }
            )

            newUser.token = token;
            await newUser.save()

            console.log(token, '<=====TOKEN')
            res.status(201).json({ message: 'User Created Successfully', status: 'success', data: newUser })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error', status: 'failed' })
        }
    }

    static async login(req, res) {

        try {
            const { email, password } = req.body;


            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required', status: 'failed' })
            }

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found', status: 'failed' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password', status: 'failed' })
            }


            const payload = {
                user: {
                    id: user._id
                }
            }

            const token = jwt.sign(
                payload,
                Constants.JWT,
                { expiresIn: "1y" }
            )

            user.token = token;
            await user.save()


            res.status(200).json({ message: 'User Login Successfully', status: 'true', data: user })

        } catch (error) {

            console.log(error)
            res.status(500).json({ message: 'Internal Server Error', status: 'failed' })

        }

    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'All fields are required', status: 'failed' })

            }

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found', status: 'failed' })
            }


            const otp = Math.floor(Math.random() * 900000 + 100000)
            const mailResponse = await sendMail({
                email: [email],
                subject: 'OTP Verification',
                htmlTemplate: `<h1>Your OTP ${otp}</h1>`

            });



            if (!mailResponse) {
                return res.status(404).json({ message: 'Failed to send OTP. Please try later', status: 'failed' })
            }

            user.otp = {
                value: otp.toString(),
                expireAt: new Date(Date.now() + 1000 * 60 * 10),
                verified: false
            }

            await user.save();

            res.status(200).json({ message: 'OTP Sent Successfully', status: 'success' })


        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error', status: 'failed' })

        }
    }

    static async verifyOtp(req, res) {
        try {

            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).json({ message: 'All Fields Are Required', status: 'failed' })

            }

            const user = await userModel.findOne({ email })
            console.log(user.otp.value)


            if (!user) {
                return res.status(404).json({ message: 'User Not Found', status: 'failed' })
            }

            console.log(user.otp.value)

            if (user.otp.value !== otp.toString()) {
                return res.status(400).json({ message: 'Invalid OTP', status: 'failed' })
            }

            const currentTime = Date();

            if (user.otp.expireAt < currentTime) {
                return res.status(400).json({ message: 'OTP is Expired', status: 'failed' })
            }

            user.otp.verified = true;
            await user.save();
            res.status(200).json({ message: 'OTP Verified Successfully', status: 'success' })


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error', status: 'failed' })
        }
    }

    static async resetPassword(req, res) {
        try {
            const { email, password } = req.body;


            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required', status: 'failed' })
            }

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found', status: 'failed' })
            }

            if (!user.otp.verified) {
                return res.status(404).json({ message: 'OTP Autherntication Failed', status: 'failed' })
                
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            user.password = hashedPassword;
            user.otp.verified = false;


            const payload = {
                user: {
                    id: user._id
                }
            }

            const token = jwt.sign(
                payload,
                Constants.JWT,
                { expiresIn: "1y" }
            )

            user.token = token;
            await user.save()


            res.status(200).json({ message: 'Password Update Successfully', status: 'success'})

        } catch (error) {
           return res.status(500).json({ message: 'Internal Server Error', status: 'success'})
            
        }
    }
}