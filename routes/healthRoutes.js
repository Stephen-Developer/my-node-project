const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *       500:
 *         description: Service is unhealthy
 */
router.get('/', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ status: 'OK', db: 'Connected' });
    } catch (err) {
        res.status(500).json({ status: 'Error', db: 'Unavailable' });
    }
});

module.exports = router;