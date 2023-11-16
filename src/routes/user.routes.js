import express from 'express'
import { login, register, remove } from '../services/user.services.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/:id', remove)

export default router;