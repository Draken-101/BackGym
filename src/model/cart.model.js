import { DataTypes, Model } from "sequelize";

import connection from "../database/connection.js";

class Cart extends Model { }

Cart.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    product:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    client: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        sequelize: connection,
        tableName: "Cart",
        timestamps: false
    })

Cart.sync()
export default Cart;