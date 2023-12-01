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
router.get('/pk/:id', auth, async function getByPk(req, res) {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." })
    }
    return res.status(200).json({ message: "Usuario no encontrado.", status: true, content: user.dataValues })

})
router.post('/pay', auth, pay)
router.put('/:id', auth, function update(req, res) {
    console.log(req.body)
    return res.status(200).json({ message: "Usuario actualizado.", status: true, content: [] })
})

export default router;