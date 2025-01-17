const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5001;
const nodemailer = require('nodemailer');
const CONNECTDB = require("./mongodb.js");
require('dotenv').config();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',  // Your React frontend
  credentials: true,  // Allow credentials (cookies) to be sent
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: 'mysecretkey',  
  resave: false,  
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 60,  
    httpOnly: true,  
    secure: false,  
    sameSite: 'lax',  
  },
}));



// MongoDB connection
CONNECTDB();


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
    const isMatch = user.password === password;
      if (isMatch) {     
          req.session.userinfo = user;
          
          return res.json({ message: 'valid user', userdata: user});       
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
 
  return res.json({
    userId: req.session.id,
    username: req.session.userinfo.name,
    email: req.session.userinfo.email,
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
  image: String,
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
    const { email, name } = req.body;
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      res.json({ message: 'Email already exists' });
    }
    else{
      const employee = new Employee(req.body);
      await employee.save();
      res.json({ message: 'Success', employee });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const adminmailoption = {
        from: process.env.EMAIL_USER, // Sender email
        to: "prabhu.colorwhistle@gmail.com", // Admin email
        subject: "New Registration!",
        text: `Hi admin,\n\nA new user has registered:\n\nName: ${name}\nEmail: ${email}\n\nBest regards,\nSystem Notification`,
      }
      
        // Send user email
        await transporter.sendMail(adminmailoption);
        console.log("User email sent successfully.");
     
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
  const { email, ...restOfBody } = req.body; 
  try {   
    const existingUser = await Employee.findOne({ email: email, _id: { $ne: userId } });    
    if (existingUser) {
      return res.json({ message: 'Email already exists' });
    }    
    const updatedEmployee = await Employee.findByIdAndUpdate(userId, { email, ...restOfBody }, { new: true });
    res.json({ message: 'Update successful', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

var multer = require('multer');
const fs = require('fs'); // Require fs module
const path = require('path'); // For working with file and directory paths

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now(); // Create a unique timestamp
    cb(null, uniqueSuffix + file.originalname); // Set filename to include timestamp
  }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/uploadimage', upload.single('image'), async (req, res) => {
  try {
    const existingAdmin = await Employee.findOne({ role: 'Admin' }); // Find the admin user

    
    if (!existingAdmin) {
      return res.status(404).json({ status: 'error', message: 'Admin not found' });
    }

    const newImageName = req.file.filename; // New uploaded image filename
    const oldImageName = existingAdmin.image; // Old image filename (if it exists)
    
    // If there's an old image, remove it from the uploads folder
    if (oldImageName) {
      
      const oldImagePath = path.join(__dirname, 'uploads', oldImageName);

      // Check if the old image exists before trying to delete it
      try {
        await fs.promises.access(oldImagePath); // Check if file exists
        await fs.promises.unlink(oldImagePath); // Delete the old image file
        console.log('Old image deleted successfully.');
      } catch (unlinkErr) {
        console.error('Error deleting the old image:', unlinkErr);
      }
    }

    // Update the admin's image field in the database
    existingAdmin.image = newImageName;
    await existingAdmin.save();

   return res.json({ status: 'uploaded', image: newImageName });
   
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).json({ status: 'error', error: error.message });
  }
});


// Add a new route to fetch the image for the admin
app.get('/getProfileImage', async (req, res) => {
  try {
    const existingAdmin = await Employee.findOne({ role: 'Admin' });
    
    if (!existingAdmin || !existingAdmin.image) {
      return res.status(404).json({ message: 'No image found for the admin.' });
    }

    return res.json({ image: existingAdmin.image }); // Return the image name or URL
  } catch (error) {
    console.error('Error fetching profile image:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('Server running on 5001');
});
  