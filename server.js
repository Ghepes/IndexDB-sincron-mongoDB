const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

const MONGODB_URI = 'mongodb+srv://ygpdeb:4HlwA0BYkSfJQ9gm@ygpdeb0.gh9s44e.mongodb.net/?retryWrites=true&w=majority&appName=Ygpdeb0'

mongoose.connect(MONGODB_URI || 'mongodb+srv://ygpdeb:4HlwA0BYkSfJQ9gm@ygpdeb0.gh9s44e.mongodb.net/?retryWrites=true&w=majority&appName=Ygpdeb0', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
