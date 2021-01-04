require('./database/mongo.js')
const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const path = require('path')
const userModel = require('./models/pzlModel.js')
const nodemailer = require('nodemailer')


const app = express()
const port = process.env.PORT || 3000
const viewsPath =path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

const hbs = exphbs.create({
  extname: "handlebars",
  defaultLayout: false,
  partialsDir: partialsPath
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', viewsPath)
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/user-form', (req,res)=>{
  res.render('index')
})

app.post('/dashboard', (req,res)=>{
  const number = req.body.phoneNumber
  var phoneno = /^\d{10}$/;
  if(!number.match(phoneno)){
    res.send('<a href="/user-form">invalid phone number</a>')
    return
  }
  const user = new userModel({
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    dob:req.body.birthday
  })
  user.save()
  const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'rajdeepsarkar1d@gmail.com',
        pass: process.env.MAIL_PASSWORD||'official2048'
      }
    })
    var mailOptions = {
      from:'rajdeepsarkar1d@gmail.com',
      to:req.body.email,
      subject:'Verification',
      text:'Welcome to parkzap labs'
    }
    transporter.sendMail(mailOptions, (err,succ)=>{
      if(err){
        throw new Error('something bad happened while sending the mail')
      }
      console.log('email sent successfully')
    })
  res.redirect('/getDashboard')
})

app.get('/getDashboard', async(req,res)=>{
  const users = await userModel.find({}).lean()
  res.render('dashboard', {userArr:users})
})

app.listen(port, ()=>{
  console.log('running');
})
