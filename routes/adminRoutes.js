const express = require('express');
const Doctor = require('../models/doctor');
const Drug = require('../models/drug');
const Admin = require('../models/admin');
const Pharmacitical = require('../models/pharmacitical');
const Symptoms = require('../models/symptoms');
const adminAuth = require('../middleware/authMiddleware');
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
  return jwt.sign({id}, 'Smart Pharma Admin', {
    expiresIn: maxAge
  })
}

router.get("/login", (req, res) => {
  res.render('admin_login', {title: 'Admin Login', errors: []});
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try{
    const patient = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
    if(admin){
      res.render('admin_page' , {title: 'Admin HomePage'});
    }

  }
  catch(err){
    const errors = handleErrors(err);    
    res.render('admin_login', {title: 'Admin Login', errors: []})
  }
});

router.get("/page", adminAuth, (req, res) => {
  res.render('admin_page', {title: 'Admin Page', errors: []});
});

router.get("/add_doctor", adminAuth, (req,res) => {
  res.render("add_doctor", {title: 'Add Doctor', errors: []});
});

router.post("/add_doctor", (req,res) => {
  const doctor = new Doctor(req.body);

  doctor.save()
    .then((result) => {
      res.render('admin_page', {title: 'Admin Page', errors: []});
    })
    .catch((err) =>{
      const errors = handleErrors(err);
      res.render('add_doctor', {title: 'Add Doctor', errors: errrors});
    })

});

router.get("/add_pharma", adminAuth, (req,res) => {
  res.render("add_pharma", {title: 'Add Pharmacitical Company', errors: []});
});

router.post("/add_pharma", (req,res) => {
  const pharma = new Pharmacitical(req.body);

  pharma.save()
    .then((result) => {
      res.render('admin_page', {title: 'Admin Page', errors: []});
    })
    .catch((err) =>{
      const errors = handleErrors(err);
      res.render('add_pharma', {title: 'Add Pharmacitical', errors: errrors});
    })
});

router.get("/add_drug", adminAuth, (req,res) => {
  res.render("add_drug", {title: 'Add Drug', errors: []});
});

router.post("/add_drug", (req,res) => {
  const drug = new Drug(req.body);

  drug.save()
    .then((result) => {
      res.render('admin_page', {title: 'Admin Page', errors: []});
    })
    .catch((err) =>{
      const errors = handleErrors(err);
      res.render('add_drug', {title: 'Add Drug', errors: errrors});
    })
});

router.get("/add_symptom", adminAuth, (req,res) => {
  res.render("add_symptom", {title: 'Add Symptom', errors: []});
});

router.post("/add_symptom", (req,res) => {
  const symptoms = new Symptoms(req.body);

  symptoms.save()
    .then((result) => {
      res.render('admin_page', {title: 'Admin Page', errors: []});
    })
    .catch((err) =>{
      const errors = handleErrors(err);
      res.render('add_symptom', {title: 'Add Symptoms', errors: errrors});
    })
});

router.get("/add_prescription", adminAuth, (req,res) => {
  res.render("add_prescription", {title: 'Add Symptom', errors: []});
});

router.post("/add_prescription", (req,res) => {
  const prescription = new Prescription(req.body);

  prescription.save()
    .then((result) => {
      res.render('admin_page', {title: 'Admin Page', errors: []});
    })
    .catch((err) =>{
      const errors = handleErrors(err);
      res.render('add_prescription', {title: 'Add Prescription', errors: errrors});
    })
});

router.get("/logout", (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/')
});

module.exports = router;