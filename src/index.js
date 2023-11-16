import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from '../app.setting.json' assert { type: 'json' }
import user_router from './routes/user.routes.js'

const app = express()

/**** START APP SETTING ****/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '100mb' }))

/**** END APP SETTING ****/

/**** START APP ROUTING ****/

app.use('/user', user_router)
app.all('*', (req, res) => {
    res.status(404).send("Endpoint or method dont found :(")
})    

/**** END APP ROUTING ****/

app.use(cors({
    origin: '*',
    methods: '*',
    credentials: true
}))

app.use(express.json)

/**** APP UP ****/
app.listen(config.app_port, config.app_host, () => {
    console.log(`Server running on ${config.app_protocol}://${config.app_host}:${config.app_port}/`)
})