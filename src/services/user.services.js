import User from '../model/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export async function register(req, res) {
    if (!req.body.email ||
        !req.body.name ||
        !req.body.lastname ||
        !req.body.password) {
        return res.status(400).send("Please provide all fields required for registration.")
    }

    const user_to_save = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: cry.hashSync(req.body.password, parseInt(process.env["HASH_SALT"])),
        payment_terms: "none",
    })

    const existing_user = await User.count({
        where: {
            email: req.body.email
        }
    })

    if (existing_user) {
        return res.status(409).send("There is already a user with the email provided.")
    }

    try {
        await user_to_save.save()
    } catch (e) {
        return res.status(500).send("Something happened during user creation.");
    }

    return res.status(201).send("User successfully created.");
}

export async function login(req, res) {
    if (!req.body.email ||
        !req.body.password) {
        return res.status(400).send("Please provide all fields required for registration.")
    }

    const existing_user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (existing_user === null) {
        return res.status(404).send("A user with the given email has not been found.");
    }

    if (!cry.compareSync(req.body.password, existing_user.dataValues.password)) {
        return res.status(401).send("Passwords do not match.");
    }

    return res.status(200).send("Successful authentication.")
}

export async function remove(req, res) {
    console.log(req.params.id)
    const existing_user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if (existing_user === null) {
        return res.status(404).send("User not found.");
    }

    await existing_user.destroy()

    return res.status(200).send("User successfully deleted")
}