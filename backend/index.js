require('dotenv').config();

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

// Connect MongoDB
connectToMongo(process.env.MONGO_URI);

// Middleware
app.use(express.json());

app.use(cors({
  origin: true, // production me kisi bhi frontend ko allow karega
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test route
app.get('/', (req, res) => {
  res.send('My name is Muhammad Abdullah');
});

// Important for Vercel
module.exports = app;