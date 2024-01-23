require("dotenv").config();

const db = require("./dbConnection");

// Connect to the MySQL server
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL");

  // Database name
  const databaseName = process.env.DATABASE_NAME;

  // Check if the database exists
  db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err, results) => {
    if (err) {
      console.error("Error creating todoapp database:", err);
      db.end();
      return;
    }

    console.log(`Database ${databaseName} created or already exists`);

    // Switch to the todoapp database
    db.changeUser({ database: databaseName }, (err) => {
      if (err) {
        console.error("Error selecting todoapp database:", err);
        db.end();
        return;
      }

      console.log(`Switched to database ${databaseName}`);

      // SQL query to create the table
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS todo_list (
            id varchar(255) NOT NULL PRIMARY KEY,
            name varchar(255) NOT NULL,
            completed varchar(10) NOT NULL,
            created_at datetime NOT NULL,
            completed_at datetime NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `;

      // Execute the SQL query to create the table
      db.query(createTableQuery, (err, results) => {
        if (err) {
          console.error("Error creating todo_list table:", err);
        } else {
          console.log("Todo_list table created successfully");
        }

        // Disconnect from the MySQL server
        db.end((err) => {
          if (err) {
            console.error("Error disconnecting from MySQL:", err);
          } else {
            console.log("Disconnected from MySQL");
          }
        });
      });
    });
  });
});
