const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const symptomsSchema = new Schema({
  email: {
    type: String,
    required :[true, 'Please enter valid Email'],
    unique:true,
    validate: [isEmail, 'Invalid email']
  },
  symptoms: {
    type: String,
    required : [true, 'Please enter Symptoms']
  },
  symptoms_started: {
    type: String,
    required : [true, 'Please enter Date']
  },
}, {timestamps: true});

const Symptoms = mongoose.model('symptoms', symptomsSchema);