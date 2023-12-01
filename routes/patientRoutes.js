const express = require('express');
const Patient = require('../models/patient');
const patientAuth = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


const router = express.Router();

//handle input errors
const handleErrors = (err) => {
  let errors = { firstname: '', lastname: '', gender: '', DOB: '', email: '', password:''};

  //login error
  if(err.message === 'Invalid Log In information'){
    errors.email = 'Invalid Log In information';
    return errors;
  }

  //duplicate error code
  if(err.code === 11000){
    errors.email = 'Email is already registered';
    return errors;
  }

  //validation errors
  if(err.message.includes('patient validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

//jsonwebtoken
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({id}, 'Smart Pharma Patient', {
    expiresIn: maxAge
  })
}

router.get("/login", (req, res) => {
  res.render('patient_login', {title: 'Patient Login', errors: []});
});

router.get("/signup", (req, res) => {
  res.render('patient_signup', {title: 'Patient Sign Up', errors: []});
});

router.get("/homepage", patientAuth,(req, res) => {
  res.render('patient_homepage', {title: 'Patient Home Page', user: []});
});

router.get("/prescription", patientAuth,(req, res) => {
  res.render('patient_prescription', {title: 'Patient Prescription Page'});
});

router.get("/symptoms", patientAuth , (req, res) => {
  res.render('patient_symptoms', {title: 'Patient Symptoms Page'});
});

router.get("/logout", (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/')
});

router.post('/signup', (req, res) => {
  const patient = new Patient(req.body);

  patient.save()
    .then((result) => {
      const patientId = result._id; 
      const token = createToken(patientId);
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
      res.redirect('/patient/homepage');
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.render('patient_signup', { title: 'Patient Sign Up', errors: errors });
    });
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try{
    const patient = await Patient.login(email, password);
    const token = createToken(patient._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
    if(patient){
      res.render('patient_homepage' , {title: 'Patient Home Page', user: patient.firstname});
    }

  }
  catch(err){
    const errors = handleErrors(err);    
    res.render('patient_login', {title: 'Patient Login', errors: errors})
  }
});

module.exports = router;