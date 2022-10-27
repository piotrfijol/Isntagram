require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}`, (err) => {
    if(err)
        console.error(err);
    else {
        console.log("MongoDB: Connected to the database.");
    }
});

