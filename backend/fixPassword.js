const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixAdminPassword() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Connected to database successfully');

    // Create correct password hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('New password hash:', hashedPassword);

    // Update admin password
    await connection.execute(
      'UPDATE admins SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );

    console.log('Admin password updated successfully');

    // Test the new password
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

fixAdminPassword();