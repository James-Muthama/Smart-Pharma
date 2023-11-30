const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const pharmaciticalSchema = new Schema({
  name: {
    type: String,
    required :[true, 'Please enter Name']
  },
  password: {
    type: String,
    required :[true, 'Please enter valid password'],
    minlength: [8, 'Minimum length of password is 8']
  },
}, {timestamps: true});

const Pharmacitical = mongoose.model('pharmacitical', pharmaciticalSchema);

module.exports = Pharmacitical;