const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, unique: true},
  password: String,
});

const User = mongoose.model('users', userSchema);


app.get('/', (req, res) => {
    res.send('Server is running');
  });

  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Create new user
    const user = new User({ username, email, password });
  
    // Save user to database
    try {
      await user.save();
      res.send({ message: 'User registered successfully' });
    } catch (error) {
      if (error.code === 11000) { // This is the error code for a duplication error
        res.status(400).send({ error: 'Email already taken' });
      } else {
        console.error(error);
        res.status(500).send({ error: 'Failed to register user' });
      }
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});