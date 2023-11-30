const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const patientRoutes = require('./routes/patientRoutes');
const adminRoutes = require('./routes/adminRoutes');



// express app
const app = express();


//connect to mongodb
const dbURL = 'mongodb+srv://SmartPharma:14WaPrompt32*@smartpharma.slzq2kc.mongodb.net/SmartPharma?retryWrites=true&w=majority';

mongoose.connect(dbURL);

//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(8000);

//middleware and static files 
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

//mongoose and mongo sandbox routes

app.get("/", (req, res) => {
  res.render('index', {title: 'Home'});
});

//admin routes
app.use('/admin', adminRoutes);

//patient routes
app.use('/patient', patientRoutes);

app.get("/doctor/login", (req, res) => {
  res.render('doctor_login', {title: 'Doctor Login'});
});

app.get("/pharmacist/login", (req, res) => {
  res.render('pharmacist_login', {title: 'Pharmacist Login'});
});


// 404
app.use((req,res) => {
  res.status(404).render('404', {title: '404'}); 
});