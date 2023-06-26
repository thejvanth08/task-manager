const express = require("express");
const router = express.Router();

// importing fuctionalities for each router
const {
    getAllTasks,
    getSingleTask,
    createNewTask,
    upadateTask,
    deleteTask
} = require("../controllers/methods.js");


// app.get("/api/v1/tasks", getAllTasks );
// app.post("/api/v1/tasks", createNewTask);
// app.get("/api/v1/tasks/:id", getSingleTask);
// app.patch("/api/v1/tasks/:id", upadateTask);
// app.delete("/api/v1/tasks/:id", deleteTask);


// to GET all tasks (items)
router.get("/", getAllTasks);

// to create new task
router.post("/", createNewTask);

// to get single task (using route parameter)
router.get("/:id", getSingleTask);

// to update task
// update particular part of a entity (like only changing completed prop of {name, completed} entity)
router.patch("/:id", upadateTask);

// to delete task
router.delete("/:id", deleteTask);


// PUT -> entirely replaces or update the content of the enity

// to export this router to app.js
module.exports = router;