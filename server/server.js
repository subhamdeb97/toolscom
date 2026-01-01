require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

// Models
const User = require('./models/User');
const History = require('./models/History');
const MockEndpoint = require('./models/MockEndpoint');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('Utility Backend is Running');
});

// Sync Database & Start
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database sync error:', err);
});
