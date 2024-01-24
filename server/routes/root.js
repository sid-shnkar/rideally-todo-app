"use strict";

const path = require("node:path");

module.exports = async function (fastify, opts) {
  // Connect html file
  fastify.get("/", async (request, reply) => {
    return reply.sendFile(
      "index.html",
      path.join(__dirname, "..", "..", "frontend", "views")
    );
  });
};
