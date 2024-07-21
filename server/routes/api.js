const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({ user_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute('SELECT user_id, email, password FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const user = users[0];
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Logged in successfully', userId: user.user_id, redirectTo: '/home' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { userId } = req.query;
    const [users] = await db.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userProfile = users[0];
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT category_id AS id, name FROM categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/cheatsheets', async (req, res) => {
  const { title, content, category_id, user_id } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO cheatsheets (title, content, category_id, user_id) VALUES (?, ?, ?, ?)',
      [title, content, category_id, user_id]
    );
    res.status(201).json({ cheatsheet_id: result.insertId });
  } catch (error) {
    console.error('Error adding cheatsheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/cheatsheets', async (req, res) => {
  const categoryId = req.query.category
  try {
    const [cheatsheets] = await db.execute('SELECT * FROM cheatsheets WHERE category_id = ?', [categoryId]);
    res.json(cheatsheets);
  } catch (error) {
    console.error('Error fetching cheatsheets by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/cheatsheets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [cheatsheets] = await db.execute('SELECT * FROM cheatsheets WHERE cheatsheet_id = ?', [id]);
    if (cheatsheets.length === 0) {
      return res.status(404).json({ message: 'Cheatsheet not found' });
    }
    res.json(cheatsheets[0]);
  } catch (error) {
    console.error('Error fetching cheatsheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/cheatsheets/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await db.execute(
      'UPDATE cheatsheets SET title = ?, content = ? WHERE cheatsheet_id = ?',
      [title, content, id]
    );
    res.json({ message: 'Cheatsheet updated successfully' });
  } catch (error) {
    console.error('Error updating cheatsheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/cheatsheets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM cheatsheets WHERE cheatsheet_id = ?', [id]);
    res.json({ message: 'Cheatsheet deleted successfully' });
  } catch (error) {
    console.error('Error deleting cheatsheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
