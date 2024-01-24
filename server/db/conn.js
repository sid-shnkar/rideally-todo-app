"use strict";

const fastify = require("fastify")();

const connOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

fastify.register(require("@fastify/mysql"), {
  connectionString: connOptions,
});

module.exports = fastify;
