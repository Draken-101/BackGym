import auth from "../middleware/auth.middleware.js";
import express from 'express'
import { add, get } from "../services/cart.services.js";

const router = express.Router()

router.get('/', auth, get)

router.post('/', auth, add)

export default router;