const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
require('dotenv').config();

const app = express();
const salt = bcrypt.genSaltSync(8);
const jwtSecret = process.env.JWT_SECRET;  

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware for JWT verification
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, userData) => {
        if (err) return res.sendStatus(403);
        req.user = userData;
        next();
    });
}

// Route handlers
app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/signup', async (req, res) => {
    const { name, mobile, password } = req.body;

    try {
        const newUser = await User.create({
            name,
            mobile,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(newUser);
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/signin', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user) {
        const isPassword = bcrypt.compareSync(password, user.password);
        if (isPassword) {
            jwt.sign({
                name: user.name,
                id: user._id
            }, jwtSecret, {}, (err, token) => {
                if (err) return res.status(500).json({ error: 'Internal server error' });
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    const { name, _id } = await User.findById(req.user.id);
    res.json({ name, _id });
});

app.post('/signout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    if (!link) {
        return res.status(400).json({ message: 'URL is required' });
    }

    const newName = 'image' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    req.files.forEach(file => {
        const { path, originalname } = file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;

        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    });

    res.json(uploadedFiles);
});

app.post('/places', authenticateToken, async (req, res) => {
    const {
        title, address, addedPhotos,
        description, perks, extraInfo, price,
        checkIn, checkOut, maxGuests
    } = req.body;

    try {
        const placeDoc = await Place.create({
            owner: req.user.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo, price,
            checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/user-places', authenticateToken, async (req, res) => {
    const userPlaces = await Place.find({ owner: req.user.id });
    res.json(userPlaces);
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const place = await Place.findById(id);
        res.json(place);
    } catch (error) {
        res.status(404).json({ error: 'Place not found' });
    }
});

// DELETE a place
app.delete('/places/:id', async (req, res) => {
    try {
      const deletedPlace = await Place.findByIdAndDelete(req.params.id);
      if (!deletedPlace) {
        return res.status(404).json({ message: 'Place not found' });
      }
      res.json({ message: 'Deleted place' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.put('/places', authenticateToken, async (req, res) => {
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo, price,
        checkIn, checkOut, maxGuests
    } = req.body;

    try {
        const placeDoc = await Place.findById(id);
        if (req.user.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo, price,
                checkIn, checkOut, maxGuests,
            });
            await placeDoc.save();
            res.json('ok');
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/places', async (req, res) => {
    const places = await Place.find();
    res.json(places);
});


app.post('/bookings', authenticateToken, async (req, res) => {
    const { place, startDate, endDate, numberOfGuests, name, mobile, price } = req.body;

    try {
        const booking = await Booking.create({
            place, startDate, endDate,
            numberOfGuests, name, mobile, price,
            user: req.user.id,
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/bookings', authenticateToken, async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('place');
    res.json(bookings);
});

// DELETE a booking 
app.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
