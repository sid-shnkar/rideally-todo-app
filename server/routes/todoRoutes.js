"use strict";

const todoController = require("../controllers/todoController");

async function todoRoutes(fastify, options) {
    fastify.get('/get-todos', todoController.getTodosHandler);
    fastify.post('/add-todo', todoController.addTodoHandler);
    fastify.post('/mark-checked', todoController.markCheckedHandler);
    fastify.post('/delete-todo', todoController.deleteTodoHandler);
  //   fastify.register(require('../db/conn').connectFastifyMySQL);
  // Add todo item to database
  //   fastify.post('/add-todo', async (request, reply) => {
  //     console.log(request.body);
  //     // Add your logic for adding a todo item to the database here
  //     return 'Todo item added successfully';
  //   });
  //   // Mark todo as checked
  //   fastify.post('/mark-checked', async (request, reply) => {
  //     console.log(request.body);
  //     // Add your logic for marking a todo as checked in the database here
  //     return 'Todo item checked successfully';
  //   });
  //   // Delete todo from database
  //   fastify.post('/delete-todo', async (request, reply) => {
  //     console.log(request.body);
  //     // Add your logic for deleting a todo from the database here
  //     return 'Todo item deleted successfully';
  //   });
}

module.exports = todoRoutes;
