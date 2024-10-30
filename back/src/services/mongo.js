const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1/BSC";


async function databaseConnection() {
  mongoose.connection.once('open',()=>{
        console.log('the database is connected...')
    })
    mongoose.connection.on('error',(err)=>{
        console.log('error',err);
    })
 await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

module.exports=databaseConnection;