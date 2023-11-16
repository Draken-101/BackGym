import { DataTypes, Model } from "sequelize";

import connection from "../database/connection.js";

class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        sequelize: connection,
        tableName: "product",
        timestamps: false
    })

Product.sync()
export default Product;