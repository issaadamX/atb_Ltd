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
  console.log('Connected to MySQL database for update');
});

// Update admins table to add missing columns
const updateAdminsTable = () => {
  const alterQueries = [
    'ALTER TABLE admins ADD COLUMN IF NOT EXISTS role VARCHAR(255) DEFAULT "admin"',
    'ALTER TABLE admins ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  ];

  alterQueries.forEach((query, index) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error updating table (query ${index + 1}):`, err);
      } else {
        console.log(`Table update ${index + 1} completed`);
      }
    });
  });
};

// Update existing admin user to have role
const updateAdminUser = () => {
  setTimeout(() => {
    const query = 'UPDATE admins SET role = ? WHERE role IS NULL OR role = ""';
    db.query(query, ['admin'], (err, result) => {
      if (err) {
        console.error('Error updating admin user:', err);
      } else {
        console.log(`Updated ${result.affectedRows} admin user(s)`);
      }
    });
  }, 1000);
};

// Run updates
updateAdminsTable();
updateAdminUser();

// Close connection
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Database update completed');
    }
  });
}, 3000);
