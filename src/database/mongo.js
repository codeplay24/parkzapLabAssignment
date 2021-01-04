const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/ParkzapDB'

mongodb+srv://rahul-uses-DB:8wdLEUSZIvoJ0mMl@firstcluster.emyrj.mongodb.net/ParkzapDB?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URL || url, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
})
