require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const todoRoutes = require("./routes/todoRoutes");

// swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo app API",
      version: "1.0.0",
      description: "A simple Express todo app API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// swagger specs
const specs = swaggerJsDoc(options);

// swagger serve api docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Connect static files in 'public' directory
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use todo routes
app.use("/", todoRoutes);

// Connect html file
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "..", "frontend", "views"),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express running → PORT ${PORT}`);
});
