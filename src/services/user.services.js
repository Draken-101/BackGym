import User from '../model/user.model.js';
import cry from 'bcrypt'
import dotenv from 'dotenv'
import json from 'jsonwebtoken'

dotenv.config()

export async function register(req, res) {
    console.log(req.body)
    if (!req.body.email ||
        !req.body.name ||
        !req.body.lastname ||
        !req.body.weight ||
        !req.body.age ||
        !req.body.filename ||
        !req.body.password) {
        return res.status(400).json({ status: false, message: "Please provide all fields required for registration.", content: {} })
    }

    const user_to_save = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: cry.hashSync(req.body.password, parseInt(process.env["HASH_SALT"])),
        role: req.body.role,
        weight: req.body.weight,
        age: req.body.age,
        img_profile: req.body.filename,
        payment_terms: "none",
    })

    const existing_user = await User.count({
        where: {
            email: req.body.email
        }
    })

    if (existing_user) {
        return res.status(409).json({ message: "There is already a user with the email provided.", status: false, content: {} })
    }

    try {
        await user_to_save.save()
    } catch (e) {
        return res.status(500).json({ message: "Something happened during user creation.", status: false, content: {} });
    }

    return res.status(201).json({
        message: "User successfully created.", status: false, content: {
            token: json.sign(
                {
                    username: user_to_save.dataValues.name,
                    id: user_to_save.dataValues.id,
                    img: user_to_save.dataValues.img_profile
                },
                process.env["JWT_TOKEN"],
                { algorithm: 'HS256' }
            )
        }
    });
}

export async function login(req, res) {
    if (!req.body.email ||
        !req.body.password) {
        return res.status(400).json(
            {
                status: false,
                content: {},
                message: "Please provide all fields required for registration."
            });
    }

    const existing_user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (existing_user === null) {
        return res.status(404).json(
            {
                status: false,
                content: {},
                message: "A user with the given email has not been found."
            });
    }

    if (!cry.compareSync(req.body.password, existing_user.dataValues.password)) {
        return res.status(401).json(
            {
                status: false,
                content: {},
                message: "Passwords do not match."
            });
    }

    return res.status(200).json({ status: true, message: "User logged sucessfully.", content: { token: json.sign({ username: existing_user.dataValues.name, id: existing_user.dataValues.id }, process.env["JWT_TOKEN"], { algorithm: 'HS256' }) } })
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

export async function list(req, res) {
    return res.json({
        status: true,
        message: "",
        content: await User.findAll()
    })
}