const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testAndCreateAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Connected to database successfully');

    // Check if admin exists
    const [rows] = await connection.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    if (rows.length > 0) {
      console.log('Admin user already exists:', rows[0]);
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        'INSERT INTO admins (username, password, role) VALUES (?, ?, ?)',
        ['admin', hashedPassword, 'admin']
      );
      console.log('Admin user created successfully');
    }

    // Test login
    const [adminRows] = await connection.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    if (adminRows.length > 0) {
      const isValid = await bcrypt.compare('admin123', adminRows[0].password);
      console.log('Password test result:', isValid);
    }

    await connection.end();
  } catch (error) {
    console.error('Database error:', error);
  }
}

testAndCreateAdmin();