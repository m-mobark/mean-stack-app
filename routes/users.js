const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//// -------------- build registration page  ---------------
router.post('/register', (req, res, next) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'not saved'
        });
      }
      res.send({
        success: true,
        message: 'user Saved',
        user
      });
    });
  });



//// ------------build login page  ---------------
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const query = { email}
    // user exists ?
    User.findOne(query, (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error, please try again'
        });
      }
  
      //search for the user
      if (!user) {
        return res.send({
          success: false,
          message: 'Error, Account not found'
        });
      }
  
      //Check if the password is correct
      user.isPasswordMatch(password, user.password, (err, isMatch) => {
  
          //Invalid password
          if (!isMatch) {
            return res.send({
              success: false,
              message: 'Error, Invalid Password'
            });
          }
  
          const day = 43200; //Token validtity in seconds
  
          //Generating token
          const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: day });
  
          //User Is Valid
          let returnUser = {
            name: user.name,
            email: user.email,
            id: user._id
          }
          return res.send({
            success: true,
            message: 'You can login now',
            user: returnUser,
            token
          });
      });
  
    });
  
  });
  
  
  
  module.exports = router;