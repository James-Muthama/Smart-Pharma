const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: {
    type: String,
    required :[true, 'Please enter First Name']
  },
  pharmaname: {
    type: String,
    required : [true, 'Please enter Last Name']
  },
  amount: {
    type: Int16Array,
    required :[true, 'Please enter valid amount']
  },
  price: {
    type: Int16Array,
    required :[true, 'Please enter valid amount']
  },
}, {timestamps: true});

const Drug = mongoose.model('drug', drugSchema);

module.exports = Drug;