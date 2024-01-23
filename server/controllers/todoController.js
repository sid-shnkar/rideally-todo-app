const todoModel = require("../models/todoModel");

/**
 * Method to get list of all todos
 * @param {*} req
 * @param {*} res
 * @returns list of all todos
 */
const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch todos");
  }
};

/**
 * Method to add a new todo in the DB
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addTodo = async (req, res) => {
  // -------- working
  console.log(req.body);
  try {
    const result = await todoModel.addTodo(
      req.body.id,
      req.body.text,
      req.body.checked
    );
    res.send("Todo item added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add todo item");
  }
};

/**
 * Method to update the completion status of a todo in the DB
 * @param {*} req
 * @param {*} res
 * @returns
 */
const markChecked = async (req, res) => {
  // -------- working
  console.log(req.body);
  try {
    await todoModel.markChecked(req.body.id, req.body.checked);
    res.send("Todo item checked successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update todo item");
  }
};

/**
 * Method to delete a todo in the DB
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteTodo = async (req, res) => {
  // -------- working
  console.log(req.body);
  try {
    await todoModel.deleteTodo(req.body.id);
    res.send("Todo item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete todo item");
  }
};

module.exports = {
  getTodos,
  addTodo,
  markChecked,
  deleteTodo,
};
