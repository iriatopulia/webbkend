// middleware/authorize.js

// Authorization middleware
function authorize(role) {
    return (req, res, next) => {
        // Check if the user has the required role
        if (req.user && req.user.role === role) {
            return next();
        }

        res.status(403).send('Forbidden');
    };
}

module.exports = authorize;
