const pool = require('../db');  // Import the pool from db.js

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");  // Query the current time
    console.log('Query Result:', result.rows);  // Log the result
    pool.end();  // Close the connection
  } catch (err) {
    console.error('Error executing query', err);  // Handle errors
  }
})();