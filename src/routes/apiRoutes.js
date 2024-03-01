// routes/apiRoutes.js

const express = require('express');
const Item = require('../models/itemModel');
const authenticateUser = require('../middleware/authenticateUser');
const authorize = require('../middleware/authorize');
const { getColorInfo, getColorScheme, getConvertedColors } = require('../services/apiServices');

const router = express.Router();

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new item
router.post('/items', authenticateUser, authorize('admin'), async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;

        // Validate input data
        if (!name || !description || !imageUrl) {
            return res.status(400).send('Invalid input data');
        }

        const newItem = new Item({ name, description, imageUrl });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing item
router.put('/items/:id', authenticateUser, authorize('admin'), async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;

        // Validate input data
        if (!name || !description || !imageUrl) {
            return res.status(400).send('Invalid input data');
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description, imageUrl },
            { new: true }
        );

        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete an item
router.delete('/items/:id', authenticateUser, authorize('admin'), async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).send('Item not found');
        }

        res.json(deletedItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/color-info/:hex', async (req, res) => {
    const { hex } = req.params;
    try {
        const colorInfo = await getColorInfo(hex);
        res.json(colorInfo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Example route using Color Scheme Generation API
router.get('/color-scheme/:hex', async (req, res) => {
    const { hex } = req.params;
    try {
        const colorScheme = await getColorScheme(hex);
        res.json(colorScheme);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Example route using Convert Colors API
router.get('/converted-colors', async (req, res) => {
    try {
        const convertedColors = await getConvertedColors();
        res.json(convertedColors);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
