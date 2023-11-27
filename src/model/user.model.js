import { DataTypes, Model } from "sequelize";

import connection from "../database/connection.js";

class User extends Model { }

User.init({
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
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    img_profile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_terms: {
        type: DataTypes.ENUM(['monthly', 'weekly', 'yearly', 'none']),
        allowNull: false,
        defaultValue: 'none'
    },
    active_until: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: DataTypes.ENUM(["admin", "client", "coach"]),
        defaultValue: "client",
        allowNull: false
    }
},
    {
        sequelize: connection,
        tableName: "user",
        timestamps: false
    })

User.sync()
export default User;