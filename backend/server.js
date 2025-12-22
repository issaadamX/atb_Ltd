const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO bookings (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, service, message]
    );
    res.status(201).json({ message: 'Booking submitted successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Projects APIs
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  const { title, type, description, image, year, location } = req.body;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO projects (title, type, description, image, year, location) VALUES (?, ?, ?, ?, ?, ?)',
      [title, type, description, image, year, location]
    );
    res.status(201).json({ message: 'Project created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, type, description, image, year, location } = req.body;

  try {
    await db.promise().query(
      'UPDATE projects SET title = ?, type = ?, description = ?, image = ?, year = ?, location = ? WHERE id = ?',
      [title, type, description, image, year, location, id]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Services APIs
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  const { title, description, features, icon } = req.body;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO services (title, description, features, icon) VALUES (?, ?, ?, ?)',
      [title, description, JSON.stringify(features), icon]
    );
    res.status(201).json({ message: 'Service created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/services/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, features, icon } = req.body;

  try {
    await db.promise().query(
      'UPDATE services SET title = ?, description = ?, features = ?, icon = ? WHERE id = ?',
      [title, description, JSON.stringify(features), icon, id]
    );
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Testimonials APIs
app.get('/api/testimonials', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM testimonials ORDER BY created_at DESC');
    // Parse features JSON for each testimonial
    const testimonials = rows.map(testimonial => ({
      ...testimonial,
      features: JSON.parse(testimonial.features || '[]')
    }));
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/testimonials', authenticateToken, async (req, res) => {
  const { name, role, content, rating, type, videoUrl } = req.body;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO testimonials (name, role, content, rating, type, video_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, role, content, rating, type, videoUrl]
    );
    res.status(201).json({ message: 'Testimonial created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/testimonials/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, role, content, rating, type, videoUrl } = req.body;

  try {
    await db.promise().query(
      'UPDATE testimonials SET name = ?, role = ?, content = ?, rating = ?, type = ?, video_url = ? WHERE id = ?',
      [name, role, content, rating, type, videoUrl, id]
    );
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query('DELETE FROM testimonials WHERE id = ?', [id]);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin appointments API (alias for bookings)
app.get('/api/admin/appointments', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/appointments/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.promise().query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Appointment status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
