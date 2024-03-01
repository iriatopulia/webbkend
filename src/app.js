// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authenticateUser = require('./middleware/authenticateUser');

const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const sessionSecret = 'mereymereymerey';
app.use(session({ /* session configuration */ }));
app.use(passport.initialize());
app.use(passport.session());
// Connect to MongoDB

app.use(
    session({
        secret: sessionSecret,
        resave: false, // Set to false to avoid deprecation warning
        saveUninitialized: false, // Set to false to avoid deprecation warning
        cookie: {
            secure: false, // Set to true if your app is served over HTTPS
            maxAge: 1000 * 60 * 60 * 24, // Session duration in milliseconds (1 day in this example)
            httpOnly: true, // Ensures the cookie is only accessed through HTTP/HTTPS
        },
        // ... other session configurations
    })
);
mongoose.connect('mongodb+srv://admerey:qwkWnoZP1sLQkAND@cluster0.bakbrcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r =>{});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(authenticateUser); // Apply authentication middleware to all routes

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', apiRoutes); // API routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
