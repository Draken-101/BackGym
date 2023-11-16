import express from 'express'
import User from '../model/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'
import { login, register, remove } from '../services/user.services.js';

dotenv.config()
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/:id', remove)

export default router;