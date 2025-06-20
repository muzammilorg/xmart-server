import dotenv from 'dotenv'

dotenv.config()

export default class Constants {
    static PORT = process.env.PORT
    static URI = process.env.DB_URI
    static JWT = process.env.JWT_SECRET
    static EMAIL_HOST = process.env.EMAIL_HOST
    static EMAIL_PORT = process.env.EMAIL_PORT
    static EMAIL_USER = process.env.EMAIL_USER
    static EMAIL_PASS = process.env.EMAIL_PASS
    static EMAIL_FROM = process.env.EMAIL_FROM
    static CLOUD_NAME = process.env.CLOUD_NAME
    static API_KEY = process.env.API_KEY
    static API_SECRET = process.env.API_SECRET

    
}
    