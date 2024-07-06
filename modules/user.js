const mong = require('mongoose')//variable that uses mongoose

mong.connect('mongodb://localhost:27017/miniproject')//connecting to the local host in mongodb

const schema = mong.Schema({//creating a schema
    name:String,
    email:String,
    Image:String
})

module.exports = mong.model("user", schema)