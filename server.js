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
    const user = new User({ username, email, password });
    try {
      await user.save();
      res.send({ message: 'User registered successfully' });
    } catch (error) {
      if (error.code === 11000) { 
        res.status(400).send({ error: 'Email already taken' });
      } else {
        console.error(error);
        res.status(500).send({ error: 'Failed to register user' });
      }
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User
      .findOne({ email });  
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).send({ error: 'Incorrect password' });
    }
    res.send({ message: 'User logged in' });
  }
  );

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});