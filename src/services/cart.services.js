import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";

export async function get(req, res) {
    console.log(req.user)
    const currentCart = await Cart.findAll({
        where: {
            "client": req.user.id
        }
    })
    res.send(currentCart)
}

export async function add(req, res) {
    if (!req.body.amount || !req.body.product) {
        return res.status(400).send("Amount or product id missing")
    }

    const selected_product = await Product.count({
        where: {
            id: req.body.product
        }
    })

    if (!selected_product) {
        res.status(404).send('Product not found');
    }

    const product_to_cart = await new Cart({
        client: req.user.id,
        product: req.body.product,
        amount: req.body.amount
    }).save()

    res.send("Product add to cart")
}