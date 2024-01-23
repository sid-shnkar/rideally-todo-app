require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");

// Connect static files in 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use todo routes
app.use("/api", todoRoutes);

// Connect html file
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "..", "views") });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express running → PORT ${PORT}`);
});
