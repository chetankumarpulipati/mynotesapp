const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model('Note', noteSchema); // Corrected model name
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, unique: true},
  password: String, 
});


const User = mongoose.model('User', userSchema); // Corrected model name
module.exports = User;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  const user = new User({username, email, password});
  try {
    await user.save();
    res.send({message: 'User registered successfully'});
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({error: 'Email already taken'});
    } else {
      console.error(error);
      res.status(500).send({error: 'Failed to register user'});
    }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    // Compare the provided password with the stored password (plaintext)
    if (user.password !== password) {
      return res.status(401).send({ error: 'Incorrect password' });
    }
    // User is authenticated, generate a token
    const token = jwt.sign({ id: user._id }, '99638134709963813470');
    // Send the token to the client
    res.send({ message: 'User logged in', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});



app.post('/notes', async (req, res) => {
  const {title, body, category} = req.body;
  const note = new Note({title, body, category}); // Corrected model name
  try {
    await note.save();
    res.send({message: 'Note created successfully'});
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({error: 'Note already exists'});
    } else {
      console.error(error);
      res.status(500).send({error: 'Failed to create note'});
    }
  }
});
app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).send(note);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Failed to fetch note'});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
