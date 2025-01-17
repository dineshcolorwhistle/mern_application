const mongoose = require('mongoose');

const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('MOngodb connected');
    }
    catch(err){

    }
   
}

module.exports = ConnectDB;