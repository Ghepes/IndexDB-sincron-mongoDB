const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Adaugă sau actualizează un utilizator
router.post('/sync', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { name, password },
      { new: true, upsert: true } // Creează dacă nu există
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing data', error: error.message });
  }
});

// Obține toți utilizatorii
router.get('/sync', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

module.exports = router;
