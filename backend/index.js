const express = require('express')
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express(); 

const salt = bcrypt.genSaltSync(8)
const jwtSecret = 'lkfvcmdert40546xdrgyuhaed'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))


mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/signup', async (req,res)=> {
    const{name,mobile,password} = req.body

    try {
      const newUser=await User.create({
         name,
         mobile,
         password:bcrypt.hashSync(password, salt), 
      })
      res.json(newUser);
    } catch (error) {
      res.status(422).json(error)
    }
})

app.post('/signin', async (req,res) => {
  const {name,password} = req.body
  const newUser = await User.findOne({name})
  if(newUser){
    const isPassword = bcrypt.compareSync(password, newUser.password)
    if(isPassword){
      jwt.sign({
        name:newUser.name,
        id:newUser._id
      }, jwtSecret, {}, (err,token)=>{
        if(err) throw err;
        res.cookie('token', token).json(newUser);
      })
      
    }
    else{
      res.json({ message: 'Invalid password' });
    }
  }else{
    return res.json({ message: 'User not found' });
  }
})

app.get('/profile', (req,res)=> {
  const {token} = req.cookies;
  if(token){
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,_id} = await User.findById(userData.id);
      res.json(userData)
    });
  }else{
    res.json(null);
  }
})

app.post('/signout',(req,res)=>{
  res.cookie('token','').json(true)
})

app.listen(3000)

