import express from 'express'
import Product from '../model/product.model.js';
import { uploader } from '../middleware/multipart.middleware.js';

const router = express.Router()

router.get('/', async function list(req, res) {
    const raw_result = await Product.findAll();

    return res.status(200).json(["a"]);
})

router.post('/', uploader, async function create(req, res) {
    if (
        !req.body.filename ||
        !req.body.name ||
        !req.body.description ||
        !req.body.price ||
        !req.body.amount
    ) {
        return res.status(400).send("There are missing fields for uploading the product.")
    }

    const new_product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.filename,
        amount: req.body.amount
    })

    await new_product.save()
    return res.send("Product uploaded")
})

router.patch('/:id', function update(req, res) {
    return res.send("update product")
})

router.delete('/:id', function remove(req, res) {
    return res.send("Product deleted")
})

export default router;