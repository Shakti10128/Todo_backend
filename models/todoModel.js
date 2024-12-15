import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true // trim extra space before start & after end
    },
    status: {
        type: String, // Specify the type of the status field
        default: "pending",
        enum: ["pending", "in-progress", "completed"] // Ensures only these values are valid
    }
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

const Todo = mongoose.model("Todo",todoSchema);
export default Todo;