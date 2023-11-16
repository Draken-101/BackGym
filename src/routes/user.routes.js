import express from 'express'
import User from '../database/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'
import { login, register } from '../services/user.services.js';

dotenv.config()
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

export default router;