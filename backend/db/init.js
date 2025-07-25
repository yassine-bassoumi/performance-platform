const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Create users table if it doesn't exist
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await pool.query(createUsersTable);
    console.log('✅ Users table ready');
    
  } catch (err) {
    console.error('❌ Database initialization error:', err);
    throw err;
  }
};

// Initialize on module load
initializeDatabase();

module.exports = pool;
