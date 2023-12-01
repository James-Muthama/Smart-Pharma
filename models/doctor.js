const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const doctorSchema = new Schema({
  firstname: {
    type: String,
    required :[true, 'Please enter First Name']
  },
  lastname: {
    type: String,
    required : [true, 'Please enter Last Name']
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

// fire a function before doc saved to db
doctorSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;