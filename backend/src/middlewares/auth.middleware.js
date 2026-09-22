const jwt = require("jsonwebtoken");
const config = require("../config/env");
const User = require("../models/User");

/**
 * Middleware to protect routes and verify JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route. No token provided."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Find user by ID (excluding password)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The user belonging to this token no longer exists."
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token. Authentication failed.",
            error: error.message
        });
    }
};

module.exports = {
    protect
};
