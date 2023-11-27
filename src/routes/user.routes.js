import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { list, login, pay, register, remove } from '../services/user.services.js';
import { uploader } from '../middleware/multipart.middleware.js';
import User from '../model/user.model.js';

const router = express.Router()

router.post('/register', uploader, register)
router.post('/login', login)
router.delete('/:id', auth, remove)
router.get('/:type', auth, list)
router.post('/pay', auth, pay)

export default router;