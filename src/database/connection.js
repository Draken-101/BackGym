import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const connection = new Sequelize(
    process.env["DATABASE_NAME"],
    process.env["DATABASE_USERNAME"],
    process.env["DATABASE_PASSWORD"],
    {
        host: process.env["DATABASE_HOST"],
        dialect: process.env["DATABASE_DIALECT"],
        port: process.env["DATABASE_PORT"],
        logging: true
    }
)

try {
    console.log("Estableciendo conexión a la base de datos...")
    await connection.authenticate()
    console.log("Conexión establecida.")
} catch (e) {
    console.error("Ha ocurrido un erro al momento de conectarse a la base de datos")
}

export default connection;