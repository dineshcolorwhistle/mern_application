
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/giant-construction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Increase timeout
})
.then(() => console.log('DB connected'))
.catch(err => console.error('DB connection error:', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  const User = mongoose.model('users', userSchema);

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(400).send('User not found');
    }
  
    const isMatch = await User.findOne({ password });
  
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }  
    return res.send('valid user');
    
  });

app.listen(PORT, () => {
    console.log('Server running on 5000');
})