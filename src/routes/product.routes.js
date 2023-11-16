import express from 'express'
import { uploader } from '../middleware/multipart.middleware.js';
import { create, list, update, remove } from '../services/product.services.js';

const router = express.Router()

router.get('/', list)
router.post('/', uploader, create)
router.patch('/:id', uploader, update)
router.delete('/:id', remove)

export default router;