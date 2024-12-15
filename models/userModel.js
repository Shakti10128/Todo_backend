import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, // Name is mandatory
            trim: true, // Removes unnecessary spaces
        },
        email: {
            type: String,
            required: true, // Email is mandatory
            unique: true, // Enforces uniqueness
        },
        password: {
            type: String, // Stores the hashed password
            required: true, // Password is mandatory
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create User Model
const User = mongoose.model("User", userSchema);

// Export User Model
export default User;