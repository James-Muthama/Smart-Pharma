const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const patientSchema = new Schema({
  firstname: {
    type: String,
    required :[true, 'Please enter First Name']
  },
  lastname: {
    type: String,
    required : [true, 'Please enter Last Name']
  },
  gender: {
    type: String,
    required :[true, 'Please choose a gender']
  },
  DOB: {
    type: String,
    required :[true, 'Please enter Date of Birth']
  },
  email: {
    type: String,
    required :[true, 'Please enter valid Email'],
    unique:true,
    validate: [isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required :[true, 'Please enter valid password'],
    minlength: [8, 'Minimum length of password is 8']
  },
}, {timestamps: true});