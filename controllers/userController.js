import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

// Create user
export const createUser = async (req, res) => {
    try {
        const { username, email,password } = req.body; // Extracting user data from the request body

        // validate the data
        if(!username || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // let's check user already exist or not
        let user = await User.findOne({email:email});

        if(user) {
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        }

        // let's hash the password
        const hashPassword = await bcrypt.hash(password,Number(process.env.SALT));
        
        // let's create the user now
        user = await User.create({
            username,
            email,
            password:hashPassword
        });

        return res.status(201).json({
            success:true,
            message:"User created successfully"
        });
        
    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to create a new user", error: error.message,
        });
    }
};

export const login = async(req,res)=>{
    try {
        // let's get the user data from req body
        const {email,password} = req.body;

        // validate the data
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // let's check if user have an account or not
        let user = await User.findOne({email:email});

        if(!user) {
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        // let's check user input correct password or not corresponding to the provided email
        let isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(400).json({
                success:false,
                message:"Email or Password Incorrect"
            })
        }

        // don't show the password on frontend side
        user.password = undefined;

        // Generate a JWT token
        const token = Jwt.sign(
            { _id: user._id, email: user.email }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        
        // httpOnly: true: Prevents client-side JavaScript from accessing the token, increasing security.
        return res.cookie("token", token, { httpOnly: true,})
        .status(200).json({
            success:true,
            message:"Login successfully",
            user:user
        })
    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to login", error: error.message,
        });
    }
}

// logout handler
export const logout = async(req,res)=>{
    try {
        // check if token exist or not in cookie
        const token = await req.cookies;

        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found, authentication required"
            });
        }

        // Clear the token by setting an expired cookie
        return res
            .cookie('token', '', { expires: new Date(0), httpOnly: true }) // expire the cookie
            .status(200)
            .json({
                success: true,
                message: "Logged out successfully"
        });

    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to logout", error: error.message,
        });
    }
}