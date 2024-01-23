const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// todo routes
router.get("/get-todos", todoController.getTodos);
router.post("/add-todo", todoController.addTodo);
router.patch("/mark-checked", todoController.markChecked);
router.delete("/delete-todo", todoController.deleteTodo);

module.exports = router;
