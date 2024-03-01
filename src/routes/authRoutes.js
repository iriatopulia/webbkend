// authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModels');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });

        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Set up user session or issue a JWT for authentication
        // Redirect upon successful login
        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
