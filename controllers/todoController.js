import Todo from "../models/todoModel.js";


// create todo
export const createTask = async(req,res)=>{
    try {
        // get the data from the body
        const {title,description} = req.body;

        // validate the data
        if(!title || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const task = await Todo.create({
            title,
            description
        })

        return res.status(201).json({
            success:true,
            message:"Todo Created",
            task
        })
    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to create task", error: error.message,
        });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        // Fetch all tasks from the Todo collection
        const tasks = await Todo.find(); 

        // If no tasks are found
        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found"
            });
        }

        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Successful response with all tasks
        return res.status(200).json({
            success: true,
            message:"Tasks fetched successfully",
            tasks
        });
    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to fetch all tasks", error: error.message,
        });
    }
}


// get single task via id
export const getSingleTask = async(req,res)=>{
    try {
        // get the task id from param
        const id = req.params.id;

        // let's check there is task or not corresponding to the id
        const task = await Todo.findById(id);
        
        if(!task) {
            return res.status(400).json({
                success:false,
                message:"No task found"
            })
        }

        return res.status(200).json({
            success:true,
            task
        })
    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to fetch the single task", error: error.message,
        });
    }
}

// update the task
export const updateTask = async(req,res)=>{
    try {
        const id = req.params.id;
        // get the status from the body
        const {status} = req.body

        // Validate the status before creating the task
        const validStatuses = ["pending", "in-progress", "completed"];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value."
            });
        }

        // validate the id
        const task = await Todo.findById(id);

        if(!task) {
            return res.status(400).json({
                success:false,
                message:"no task found"
            })
        }

        await Todo.findByIdAndUpdate(id,{
            status:status
        })

        return res.status(201).json({
            success:true,
            message:"task updated successfully"
        })

    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to update the task", error: error.message,
        });
    }
}

// delete a task via id
export const deleteTask = async(req,res)=>{
    try {
        const id = req.params.id;
        // validate the id
        const task = await Todo.findById(id);

        if(!task) {
            return res.status(400).json({
                success:false,
                message:"Invalid Id"
            })
        }

        await Todo.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"task deleted successfully"
        })

    } catch (error) {
        // Send a meaningful error response
        return res.status(500).json({ 
            success:false,
            message: "Failed to delete the task", error: error.message,
        });
    }
}