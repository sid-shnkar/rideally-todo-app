"use strict";

const fastify = require("fastify")();

const connOptions = {
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "todoapp",
};

fastify.register(require("@fastify/mysql"), {
  connectionString: connOptions,
});

module.exports = fastify;

// const fastifyMySQL = require('@fastify/mysql');

// const connOptions = {
//   host: process.env.DATABASE_HOST || 'localhost',
//   user: process.env.DATABASE_USER || 'root',
//   password: process.env.DATABASE_PASSWORD || '',
//   database: process.env.DATABASE_NAME || 'todoapp',
// };

// function connectFastifyMySQL(fastify) {
//   fastify.register(fastifyMySQL, { connectionString: connOptions });
// }

// module.exports = { connectFastifyMySQL };
