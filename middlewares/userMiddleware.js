import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Authentication middleware to verify the user's token
export const isAuth = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        // If token doesn't exist
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login First"
            });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user info to the request object (after decoding the token)
        req.user = await User.findById(decoded._id);

        // If no user found
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Proceed to next middleware or route handler
        next();

    } catch (error) {
        // Handle error (invalid token, expired token, etc.)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message,
        });
    }
}

export default isAuth;
