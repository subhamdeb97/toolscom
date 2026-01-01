const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const History = require('../models/History');
const MockEndpoint = require('../models/MockEndpoint');

// HISTORY API
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const history = await History.findAll({
            where: { UserId: req.user.id },
            order: [['createdAt', 'DESC']],
            limit: 50
        });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/history', authenticateToken, async (req, res) => {
    try {
        const { toolId, input, output, metadata } = req.body;
        const entry = await History.create({
            UserId: req.user.id,
            toolId,
            input,
            output,
            metadata
        });
        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MOCK ENDPOINTS API
router.get('/mock', authenticateToken, async (req, res) => {
    try {
        const mocks = await MockEndpoint.findAll({ where: { UserId: req.user.id } });
        res.json(mocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/mock', authenticateToken, async (req, res) => {
    try {
        const { method, path, responseBody, statusCode, delay } = req.body;
        const mock = await MockEndpoint.create({
            UserId: req.user.id,
            method, path, responseBody, statusCode, delay
        });
        res.status(201).json(mock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/mock/:id', authenticateToken, async (req, res) => {
    try {
        await MockEndpoint.destroy({ where: { id: req.params.id, UserId: req.user.id } });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
