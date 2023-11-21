import express from 'express'
import { uploader } from '../middleware/multipart.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { create, list, update, remove } from '../services/product.services.js';

const router = express.Router()

router.get('/',auth, list)
router.post('/',auth, uploader, create)
router.patch('/:id',auth, uploader, update)
router.delete('/:id',auth, remove)

export default router;