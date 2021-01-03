const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  dob:{
    type:String,
    required:true
  }
})

const userModel = new mongoose.model('userModel', userSchema)

module.exports = userModel
