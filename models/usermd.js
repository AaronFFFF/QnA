const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email:{
    	type:String,
        required:true
    },
    userid:{
        type:String,
        required:true, 
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('users',LoginSchema);
