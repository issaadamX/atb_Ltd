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
  console.log('Connected to MySQL database');
});

// Create tables
const createTables = () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      service VARCHAR(255),
      message TEXT,
      status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(100),
      description TEXT,
      image VARCHAR(500),
      year YEAR,
      location VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      features JSON,
      icon VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255),
      content TEXT,
      rating INT CHECK (rating >= 1 AND rating <= 5),
      type ENUM('text', 'video') DEFAULT 'text',
      video_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  tables.forEach((tableQuery, index) => {
    db.query(tableQuery, (err, result) => {
      if (err) {
        console.error(`Error creating table ${index + 1}:`, err);
      } else {
        console.log(`Table ${index + 1} created or already exists`);
      }
    });
  });
};

// Insert default admin user
const insertDefaultAdmin = () => {
  const bcrypt = require('bcryptjs');
  const defaultUsername = 'admin';
  const defaultPassword = 'admin123'; // Change this in production

  bcrypt.hash(defaultPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    const query = 'INSERT IGNORE INTO admins (username, password) VALUES (?, ?)';
    db.query(query, [defaultUsername, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting default admin:', err);
      } else if (result.affectedRows > 0) {
        console.log('Default admin user created');
      } else {
        console.log('Default admin user already exists');
      }
    });
  });
};

// Run initialization
createTables();
setTimeout(insertDefaultAdmin, 1000); // Wait for tables to be created

// Close connection after operations
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Database initialization completed');
    }
  });
}, 2000);
