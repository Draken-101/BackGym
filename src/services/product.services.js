
import Product from '../model/product.model.js';
import fs from 'fs'
import config from '../../app.setting.json' assert { type: 'json' }

export async function list(req, res) {
    const raw_result = await Product.findAll();

    if (!raw_result.length) {
        return res.status(404).json({ status: false, message: "Products not found", content: [] });
    }

    let result = raw_result.map((record) => {
        return record.dataValues
    })

    return res.status(200).json({ content: result, message: "", status: true });
}

export async function create(req, res) {
    if (
        !req.body.filename ||
        !req.body.name ||
        !req.body.description ||
        !req.body.price ||
        !req.body.amount
    ) {
        return res.status(400).json({ message: "There are missing fields for uploading the product.", status: false, content: [] })
    }

    const new_product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.filename,
        amount: req.body.amount
    })

    await new_product.save()
    return res.json({ message: "Product uploaded", status: true, content: [] })
}

export async function update(req, res) {

    const product_to_update = await Product.findByPk(parseInt(req.params.id))

    if (product_to_update == null) {
        fs.unlinkSync(`${process.cwd()}/src/${config.storage_folder}/${req.body.filename}`)
        return res.status(404).send("Product not found");
    }

    const data_to_save = {
        name: req.body.name ? req.body.name : product_to_update.dataValues.name,
        description: req.body.description ? req.body.description : product_to_update.dataValues.description,
        price: req.body.price ? req.body.price : product_to_update.dataValues.price,
        img: req.body.filename ? req.body.filename : product_to_update.dataValues.img,
        amount: req.body.amount ? req.body.amount : product_to_update.dataValues.amount,
    }

    await product_to_update.update(data_to_save)

    if (product_to_update.dataValues.img !== req.body.filename) {
        try {
            fs.unlinkSync(`${process.cwd()}/src/${config.storage_folder}/${product_to_update.dataValues.img}`)
        } catch (e) {
            console.error("No se ha podido eliminar el archivo")
        }
    }

    return res.send("update product")
}

export async function remove(req, res) {
    const product_to_delete = await Product.findByPk(parseInt(req.params.id))

    if (product_to_delete == null) {
        return res.status(404).json({message:"Product not found.", status: false})
    }

    product_to_delete.destroy()

    return res.status(200).json({message:"Product deleted", status: true})
}