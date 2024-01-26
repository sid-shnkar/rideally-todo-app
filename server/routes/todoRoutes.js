const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - text
 *         - checked
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the todo
 *         text:
 *           type: string
 *           description: A brief description of the todo
 *         checked:
 *           type: string
 *           description: To know whether todo completed or not
 *       example:
 *         id: task 123
 *         text: Watch a movie
 *         checked: "false"
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The Todos managing API
 */

// todo routes

/**
 * @swagger
 * /get-todos:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */

router.get("/get-todos", todoController.getTodos);

/**
 * @swagger
 * /add-todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/text:
 *       500:
 *         description: Some server error
 */

router.post("/add-todo", todoController.addTodo);

/**
 * @swagger
 * /mark-checked:
 *  patch:
 *    summary: Update the todo by the id
 *    tags: [Todos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - checked
 *             properties:
 *               id:
 *                 type: string
 *               checked:
 *                 type: string
 *             example:
 *               id: "your_string_id_here"
 *               checked: "true"
 *    responses:
 *      200:
 *        description: The todo was updated
 *        content:
 *          application/text:
 *      500:
 *        description: Some error happened
 */

router.patch("/mark-checked", todoController.markChecked);

/**
 * @swagger
 * /delete-todo:
 *  delete:
 *    summary: Delete the todo by the id
 *    tags: [Todos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *             example:
 *               id: "your_string_id_here"
 *    responses:
 *      200:
 *        description: The todo was deleted
 *        content:
 *          application/text:
 *      500:
 *        description: Some error happened
 */

router.delete("/delete-todo", todoController.deleteTodo);

module.exports = router;
