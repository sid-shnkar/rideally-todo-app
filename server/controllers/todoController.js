'use strict'

const todoModel = require("../models/todoModel");

async function getTodosHandler(request, reply) {
  try {
    const todos = await todoModel.getTodos();
    reply.send(todos);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Failed to fetch todos");
  }
}

async function addTodoHandler(request, reply) {
  try {
    const result = await todoModel.addTodo(
      request.body.id,
      request.body.text,
      request.body.checked
    );
    reply.send("Todo item added successfully");
  } catch (error) {
    console.error(error);
    reply.status(500).send("Failed to add todo item");
  }
}

async function markCheckedHandler(request, reply) {
  try {
    await todoModel.markChecked(request.body.id, request.body.checked);
    reply.send("Todo item checked successfully");
  } catch (error) {
    console.error(error);
    reply.status(500).send("Failed to update todo item");
  }
}

async function deleteTodoHandler(request, reply) {
  try {
    await todoModel.deleteTodo(request.body.id);
    reply.send("Todo item deleted successfully");
  } catch (error) {
    console.error(error);
    reply.status(500).send("Failed to delete todo item");
  }
}

module.exports = {
  getTodosHandler,
  addTodoHandler,
  markCheckedHandler,
  deleteTodoHandler,
};
