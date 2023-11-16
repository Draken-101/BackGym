import express from 'express'
import User from '../model/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'
import { login, register } from '../services/user.services.js';

dotenv.config()
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/:id', async function remove(req, res) {
    console.log(req.params.id)
    const existing_user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if(existing_user === null){
        return res.status(404).send("User not found.");
    }

    await existing_user.destroy()

    return res.status(200).send("User successfully deleted")
})

export default router;