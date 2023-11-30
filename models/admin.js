const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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

const Admin = mongoose.model('admin', adminSchema);