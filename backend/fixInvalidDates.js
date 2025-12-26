const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'issa',
  password: process.env.DB_PASSWORD || '87654321',
  database: process.env.DB_NAME || 'abc.sarl'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database for fixing invalid dates');
});

// Function to fix invalid updatedAt dates
const fixInvalidDates = () => {
  const tables = ['services', 'projects', 'testimonials'];

  tables.forEach(table => {
    // Update updatedAt where it's invalid (0000-00-00 or similar) to createdAt
    const query = `UPDATE \`${table}\` SET updatedAt = createdAt WHERE updatedAt < '1970-01-01 00:00:00' OR updatedAt IS NULL`;

    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error fixing ${table}:`, err);
      } else {
        console.log(`Fixed ${result.affectedRows} rows in ${table}`);
      }
    });
  });
};

// Run the fix
fixInvalidDates();

// Close connection after operations
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Invalid dates fix completed');
    }
  });
}, 5000);
