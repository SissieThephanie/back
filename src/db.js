import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Conversion EXPLICITE du mot de passe
const password = String(process.env.DB_PASSWORD || '');

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: password, // Garanti d'être une string
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: false,
  connectionTimeoutMillis: 2000
});

// Debug des paramètres de connexion
console.log('🔑 Paramètres DB:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.on('connect', () => console.log('🟢 Connecté à PostgreSQL'));
pool.on('error', err => console.error('🔴 ERREUR DB:', err));

export const query = async (text, params) => {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('❌ Erreur SQL:', {
      query: text,
      params: params,
      error: err.message
    });
    throw err;
  } finally {
    if (client) client.release();
  }
};

// Test IMMÉDIAT de connexion
(async () => {
  try {
    await pool.query('SELECT 1+1 AS test');
    console.log('✅ Test DB réussi');
  } catch (err) {
    console.error('💥 ÉCHEC test DB:', {
      message: err.message,
      stack: err.stack
    });
    process.exit(1);
  }
})();