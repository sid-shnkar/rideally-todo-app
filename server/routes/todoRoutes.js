"use strict";

const todoController = require("../controllers/todoController");

async function todoRoutes(fastify, options) {
  fastify.get("/get-todos", todoController.getTodosHandler);
  fastify.post("/add-todo", todoController.addTodoHandler);
  fastify.patch("/mark-checked", todoController.markCheckedHandler);
  fastify.delete("/delete-todo", todoController.deleteTodoHandler);
}

module.exports = todoRoutes;
