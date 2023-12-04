import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { list, login, pay, register, remove } from '../services/user.services.js';
import { uploader } from '../middleware/multipart.middleware.js';
import User from '../model/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'

const router = express.Router()
dotenv.config()

router.post('/register', uploader, register)
router.post('/login', login)
router.delete('/:id', auth, remove)
router.get('/:type', auth, list)
router.get('/pk/:id', auth, async function getByPk(req, res) {
    const user = await User.findByPk(req.params.id)

    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." })
    }

    return res.status(200).json({ message: "Usuario no encontrado.", status: true, content: user.dataValues })

})

router.post('/pay', auth, pay)
router.put('/:id', auth, async function update(req, res) {
    if (!req.body.password) {
        delete req.body.password;
    } else {
        req.body.password = cry.hashSync(req.body.password, parseInt(process.env["HASH_SALT"]))
    }

    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    return res.status(200).json({ message: "Usuario actualizado.", status: true, content: [] })
})

export default router;