const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.use(express.json());

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ error: 'User already exists or server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.send({ message: 'Login successful', token });
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
