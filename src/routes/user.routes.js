import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { login, register, remove } from '../services/user.services.js';
import { uploader } from '../middleware/multipart.middleware.js';

const router = express.Router()

router.post('/register', uploader, register)
router.post('/login', login)
router.delete('/:id', auth, remove)

export default router;