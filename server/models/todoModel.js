const db = require("../db/dbConnection");

/**
 * Method to query the DB to get list of all todos
 * @returns
 */
const getTodos = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM todo_list";

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Method to query the DB to add a new todo
 * @param {id of the todo to be added} id
 * @param {todo text} text
 * @param {tells the completion status} checked
 * @returns
 */
const addTodo = (id, text, checked) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO todo_list (id, name, completed, created_at) VALUES (?, ?, ?, ?)";
    const values = [id, text, checked, new Date().toISOString()];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Method to query the DB to update the completed status of a todo
 * @param {id of the todo to update} id
 * @param {tells the completion status} checked
 * @returns
 */
const markChecked = (id, checked) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE todo_list SET completed = ?, completed_at = ? WHERE id = ?";
    const values = [checked, new Date().toISOString(), id];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Method to query the DB to delete a todo
 * @param {id of the todo to be deleted} id
 * @returns
 */
const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM todo_list WHERE id = ?";
    const values = [id];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getTodos,
  addTodo,
  markChecked,
  deleteTodo,
};
