const mongoose = require('mongoose');
require('dotenv').config()
const connect = async function () {
   mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: false,
        useUnifiedTopology: false,
    })
}
module.exports =  {connect}