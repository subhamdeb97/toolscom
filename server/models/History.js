const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const History = sequelize.define('History', {
    toolId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    input: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    output: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSON, // Additional info like 'flags' for regex
        allowNull: true
    }
});

// Relationships
User.hasMany(History);
History.belongsTo(User);

module.exports = History;
