import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { login, register, remove } from '../services/user.services.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/:id', auth, remove)

export default router;