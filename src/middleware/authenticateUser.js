// middleware/authenticateUser.js

function authenticateUser(req, res, next) {
    console.log(req);
    // Check if the user is authenticated (session or JWT validation)
    // Redirect unauthenticated users to the login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    next();
}

module.exports = authenticateUser;
