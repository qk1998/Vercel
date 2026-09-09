import { getConnection } from '../../lib/db.js';

export default async function handler(req, res) {
  try {
    const pool = await getConnection();

    await pool.query('USE ' + process.env.TIDB_DATABASE);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, email, avatar_url } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'name 和 email 是必需的' });
      }
      const [result] = await pool.query(
        'INSERT INTO users (name, email, avatar_url) VALUES (?, ?, ?)',
        [name, email, avatar_url || null]
      );
      const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return res.status(201).json(newUser[0]);
    }

    return res.status(405).json({ error: '方法不允许' });
  } catch (err) {
    console.error('API ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
}import pool from '../../lib/db.js';

export default async function handler(req, res) {
  // 初始化数据库表
  await pool.query('USE ' + process.env.TIDB_DATABASE);
  await pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, avatar_url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  await pool.query('CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, content TEXT NOT NULL, image_url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)');

  if (req.method === 'GET') {
    // 获取所有用户
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    // 创建新用户
    const { name, email, avatar_url } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name 和 email 是必需的' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (name, email, avatar_url) VALUES (?, ?, ?)',
      [name, email, avatar_url || null]
    );
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return res.status(201).json(newUser[0]);
  }

  return res.status(405).json({ error: '方法不允许' });
}
