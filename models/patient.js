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

// fire a function before doc saved to db
patientSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

//static method to login use
patientSchema.statics.login = async function(email, password) {
  const patient = await this.findOne({email});
  if(patient){
    const auth =  await bcrypt.compare(password, patient.password);
    if(auth){
      return patient;
    }
    throw Error('Invalid Log In information');
  }
  throw Error('Invalid Log In information');
}

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;