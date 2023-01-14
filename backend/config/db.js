const mongoose = require('mongoose');
require("dotenv").config()

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb+srv://instagram26244:insta@cluster0.kfvbx6w.mongodb.net/?retryWrites=true&w=majority" , {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Mongoose Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;