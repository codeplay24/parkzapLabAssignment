const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/ParkzapDB'


mongoose.connect(process.env.MONGODB_URL || url, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
})
