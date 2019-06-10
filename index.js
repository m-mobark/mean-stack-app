require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
const app = express();

const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');

//Connection
mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});
mongoose.connection.on('error',  (err) => {
  console.log(`error cant connect: ${err}`);
});
//port3000
const _PORT = process.env.PORT;
app.use(cors());
app.use(bodayParser.json());

//Passport 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Rotuer
app.get('/', (req, res, next) => {
  res.send('blablabalaaa')
});

//user Routes
app.use('/users', UserRoutes);
//task Routes
app.use('/tasks', TaskRoutes);

//server
app.listen(_PORT, () => {
  console.log('Server Started');
});
