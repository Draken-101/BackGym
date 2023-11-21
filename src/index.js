import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'

import config from '../app.setting.json' assert { type: 'json' }

import user_router from './routes/user.routes.js'
import product_router from './routes/product.routes.js'
import cart_router from './routes/cart.routes.js'

const app = express()
const current_path = process.cwd()

/**** START APP SETTING ****/

app.use(cors({ 
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

/**** END APP SETTING ****/


/**** START STORAGE FOLDER ****/

if (!fs.existsSync(`${current_path}/src/${config.storage_folder}`)) {
    fs.mkdirSync(`${current_path}/src/${config.storage_folder}`)
}

app.use(express.static(`${current_path}/src/${config.storage_folder}`))

/**** END STORAGE FOLDER ****/


/**** START APP ROUTING ****/

app.use('/user', user_router)
app.use('/product', product_router)
app.use('/cart', cart_router)

app.all('*', (req, res) => {
    res.status(404).send("Endpoint or method dont found :(")
})

/**** END APP ROUTING ****/


/**** APP UP ****/
app.listen(config.app_port, config.app_host, () => {
    console.log(`Server running on ${config.app_protocol}://${config.app_host}:${config.app_port}/`)
})