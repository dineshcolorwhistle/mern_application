const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',  // Your React frontend
  credentials: true,  // Allow credentials (cookies) to be sent
}));
app.use(cookieParser());
app.use(session({
  secret: 'mysecretkey',  
  resave: false,  
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60,  
    httpOnly: true,  
    secure: false,  
    sameSite: 'lax',  
  },
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/giant-construction', {
  serverSelectionTimeoutMS: 30000 // Increase timeout
})
.then(() => console.log('DB connected'))
.catch(err => console.error('DB connection error:', err));


const userSchema = new mongoose.Schema({
  username: String, 
  password: String,
});

const User = mongoose.model('User', userSchema); 

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); 
   
    if(user == null) {    
      return res.json({ message: 'Invalid credentials' });
    }
    else if (user.username === username) {
    const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {     
          req.session.username = username;     
          return res.json({ message: 'valid user' });       
      } else {
        return res.json({ message: 'Invalid credentials' });
      }
    }
    else {     
      return res.json({ message: 'Invalid credentials' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  const sessionCookie = req.cookies['connect.sid'];
  if (!sessionCookie) {
    res.json({ message: 'loggedout' });
  }
 else{
  res.json({
    message: 'Profile data',
    userId: req.session.id,
    username: req.session.username,
    message:'logged'
  });
 }

});

app.post('/logout', (req, res) => { 
  res.clearCookie("connect.sid");
  res.json({ message: 'logged out' });
});

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  role: String,
  createdDate: { 
    type: String, 
    default: () => {
      const today = new Date();
      return today.toLocaleDateString('en-GB'); 
    }
  }
});

const Employee = mongoose.model('users', employeeSchema);  // Use a distinct model name

app.post('/add', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      res.json({ message: 'Email already exists' });
    }
    else{
      const employee = new Employee(req.body);
      await employee.save();
      res.json({ message: 'Success', employee });
    }

   
    
  } catch (error) {
    res.json({ error: error.message });
  }
});




app.get('/users', async (req,res) => {
  try{
    const userdata = await Employee.find();
    return res.json(userdata);
  }
  catch(err){
    
  }
})

app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;
  try {  
    const deletedUser = await Employee.findByIdAndDelete(userId);   
    res.json({ message: 'deleted', user: deletedUser });
  } catch (error) {    
    res.json({ error: error.message });
  }
});


app.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, ...restOfBody } = req.body; // Destructure email from req.body

  try {
    // Check if the updated email already exists, excluding the current user
    const existingUser = await Employee.findOne({ email: email, _id: { $ne: userId } });
    
    if (existingUser) {
      return res.json({ message: 'Email already exists' });
    }

    // If email is not in use, proceed with the update
    const updatedEmployee = await Employee.findByIdAndUpdate(userId, { email, ...restOfBody }, { new: true });
    
    res.json({ message: 'Update successful', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log('Server running on 5000');
});
