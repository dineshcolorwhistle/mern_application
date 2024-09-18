
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Giants')
.then(() => {
    console.log('DB connected');
})
.catch(() => {
    console.log('DB not connected');
});

app.listen(PORT, () => {
    console.log('Server running on 5000');
})