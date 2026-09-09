import { getConnection } from '../../lib/db.js';

export default async function handler(req, res) {
  try {
    const pool = await getConnection();

    await pool.query('USE ' + process.env.TIDB_DATABASE);

    if (req.method === 'GET') {
      const [rows] = await pool.query(`
        SELECT posts.*, users.name, users.avatar_url
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
      `);
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { user_id, content, image_url } = req.body;
      if (!user_id || !content) {
        return res.status(400).json({ error: 'user_id 和 content 是必需的' });
      }
      const [result] = await pool.query(
        'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
        [user_id, content, image_url || null]
      );
      const [newPost] = await pool.query(`
        SELECT posts.*, users.name, users.avatar_url
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.id = ?
      `, [result.insertId]);
      return res.status(201).json(newPost[0]);
    }

    return res.status(405).json({ error: '方法不允许' });
  } catch (err) {
    console.error('API ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
}
