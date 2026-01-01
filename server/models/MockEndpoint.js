const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const MockEndpoint = sequelize.define('MockEndpoint', {
    method: {
        type: DataTypes.STRING, // GET, POST, etc.
        allowNull: false
    },
    path: {
        type: DataTypes.STRING, // /api/my-endpoint
        allowNull: false
    },
    responseBody: {
        type: DataTypes.TEXT,
        defaultValue: '{}'
    },
    statusCode: {
        type: DataTypes.INTEGER,
        defaultValue: 200
    },
    delay: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

User.hasMany(MockEndpoint);
MockEndpoint.belongsTo(User);

module.exports = MockEndpoint;
