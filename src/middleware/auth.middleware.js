import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export default function auth(req, res, next) {
    if (!req.headers['authorization']) {
        return res.status(401).send("Token missing");
    }
    const token = req.headers['authorization'].replace("Bearer ", "")
    try {

        const userinfo = jwt.verify(token, process.env["JWT_TOKEN"], { algorithm: 'HS256' })
        req.user = userinfo;
        next()
    } catch (e) {
        return res.status(401).send("Token invalid");
    }
}