const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const prescriptionSchema = new Schema({
  patient_email: {
    type: String,
    required :[true, 'Please enter valid Email'],
    unique:true,
    validate: [isEmail, 'Invalid email']
  },
  docotor_email: {
    type: String,
    required :[true, 'Please enter valid Email'],
    unique:true,
    validate: [isEmail, 'Invalid email']
  },
  symptoms: {
    type: String,
    required :[true, 'Please enter a symptoms']
  },
  drug_name: {
    type: String,
    required :[true, 'Please enter a drug name']
  },
  quantity: {
    type: String,
    required :[true, 'Please enter valid quantity'],
  },
  dosage: {
    type: String,
    required :[true, 'Please enter valid quantity'],
  },
  quantity: {
    type: String,
    required :[true, 'Please enter valid quantity'],
  },
  start_date: {
    type: String,
    required :[true, 'Please enter Prescription Start Date'],
  },
  end_date: {
    type: String,
    required :[true, 'Please enter Prescription End Date'],
  },
  price: {
    type: String,
    required :[true, 'Please enter price'],
  },
}, {timestamps: true});


const Prescription = mongoose.model('prescription', prescriptionSchema);

module.exports = Prescription;