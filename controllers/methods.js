// functionalities for all route handlers
const Task = require("../models/Task.js");

const getAllTasks = async (req, res) =>  {
    try {
        // to get all docs with only name, completed fields
        // queries dont return promise but they have then(), catch() for convenience
        const tasks = await Task.find(null, "name completed");
        // console.log(allTasks);
        res.status(200).json({ tasks });
    } catch(error) {
        res.status(500).json({msg: error});
    }
};

const getSingleTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id: id});
        // if id is not provided with proper syntax
        if(!task) {
            return res.status(404).json({msg: "there is no task with id: " + id})
        }
            res.status(200).json({task});

    } catch(error) {
        res.status(500).json({msg: error});
    }
};

const createNewTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        // task -> acutal doc stored in db (it's like with _id prop, etc.)
        // if any error happens in posting to database (here error will happen), so use try catch
        res.status(201).json({task});
    } catch(error) {
        // server error for not posting the data into db
        res.status(500).json({msg: error});
    }
};

// We are using PATCH method (to update only the particular part of item or entity)
const upadateTask =  async (req, res) => {
    try {
        const {id} = req.params;
        // filter obj, update_value
        // without filter it returns the old value; it doesnt update with validation which was in schema
        // so set options object
        const task = await Task.findOneAndUpdate({_id: id}, req.body,{
            new: true, runValidators: true, useFindAndModify: false
        });
        // for PUT method add the option -> overwrite: true

        // if task is not found (pattern/structure same, but different value)
        if(!task) {
            return res.send("task with that id not found");
        }

        res.json(task);
    
    } catch(error) {
        // when id is entirely different
        // validation errors also will be catch here
        res.send(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        // const deletedInfo = await Task.deleteOne({_id: id});
        // deletedInfo -> object
        // res.status(200).json(deletedInfo);
        
        // to find and delete
        const task = await Task.findOneAndDelete({_id: id});
        
        // if we have same structure for id like length, we may get this error
        // like when id pattern is same but not exact value
        if(!task) {
            return res.status(404).json({ msg: "there is no task with that id" });
        }
        res.status(200).json(task);
    } catch(error) {
        // when id is entirely different
        res.status(500).json({msg: error});
    }
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createNewTask,
    upadateTask,
    deleteTask
};