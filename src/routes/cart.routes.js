import auth from "../middleware/auth.middleware.js";
import express from 'express'
import { add, get } from "../services/cart.services.js";
import Cart from "../model/cart.model.js";
import { Op } from "sequelize";

const router = express.Router()

router.get('/', auth, get)
router.post('/', auth, add)
router.delete('/:id', auth, async function destroy(req, res) {
    const result = await Cart.findOne({
        where: {
            [Op.and]: [
                { "product": req.params.id },
                { "client": req.user.id }
            ]
        }
    })
    if (!result) {
        return res.status(404).json({ content: result, message: "Producto no encontrado.", status: false });
    }

    await result.destroy()

    return res.status(200).json({ content: result, message: "Producto eliminado.", status: true });
})
router.delete('/', auth, async function destroy(req, res) {
    const result = await Cart.destroy({
        where: {
            client: req.user.id
        }
    });

    if (result === 0) {
        return res.status(404).json({ message: "Productos no encontrados.", status: false });
    }

    return res.status(200).json({ message: "Productos eliminados exitosamente.", status: true });

})

export default router;