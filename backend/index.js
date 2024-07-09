const express = require('express')
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
const Place = require('./models/Place.js')

require('dotenv').config()
const app = express(); 

const salt = bcrypt.genSaltSync(8)
const jwtSecret = 'lkfvcmdert40546xdrgyuhaed'

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));
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

app.post('/upload-by-link',async(req,res) => {
  const {link} = req.body
  if(!link){
    res.json({message:'Url is required'})
  }
  const newName = 'image' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  })
  res.json(newName)
})



const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;

    fs.renameSync(path, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        res.status(500).json({ error: 'Error uploading file' });
      }
    });
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
  const {token} = req.cookies
  const { 
    title, address, addedPhotos,
    description, perks, extraInfo, price, 
    checkIn, checkOut, maxGuests} = req.body
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, photos:addedPhotos,
      description, perks, extraInfo, price,
      checkIn, checkOut, maxGuests,
    })
    res.json(placeDoc)
  });
})

app.get('/user-places', (req,res) =>{
  const{token} =req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} =userData
    res.json( await Place.find({owner:id}))
  })
})

app.get('/places/:id', async (req,res) => {
  const {id} = req.params
  res.json(await Place.findById(id))
})

app.put('/places', async(req,res) => {
  const {token} = req.cookies
  const { 
    id,
    title, address, addedPhotos,
    description, perks, extraInfo,price, 
    checkIn, checkOut, maxGuests} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err
      const placeDoc = await Place.findById(id)
      if(userData.id === placeDoc.owner.toString()){
        placeDoc.set({
          title, address, photos:addedPhotos,
          description, perks, extraInfo, price,
          checkIn, checkOut, maxGuests,
        })
        await placeDoc.save()
        res.json('ok')
      }
    })
})

app.get('/places', async(req,res) =>{
  res.json(await Place.find())
})

app.listen(3000)

