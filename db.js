const mongoose = require('mongoose');
require('dotenv').config()

const uri = process.env.password;
const connectDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión exitosa");
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = connectDb;