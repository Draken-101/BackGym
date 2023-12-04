import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export default function auth(req, res, next) {
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: "Token missing", status: false, content: [] });
    }
    const token = req.headers['authorization'].replace("Bearer ", "")
    try {
        const userinfo = jwt.verify(token, process.env["JWT_TOKEN"], { algorithm: 'HS256' })
        req.user = userinfo;
        next()
    } catch (e) {
        return res.status(401).json({message:"Tu sesión ha expirado.", status: false, content: [] });
    }
}