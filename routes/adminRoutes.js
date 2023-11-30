const express = require('express');
const Patient = require('../models/patient');
const requireAuth = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


const router = express.Router();


router.get("/login", (req, res) => {
  res.render('admin_login', {title: 'Admin Login'});
});

router.get("/page", (req, res) => {
  res.render('admin_page', {title: 'Admin Page'});
});

router.get("/add_doctor", (req,res) => {
  res.render("add_doctor", {title: 'Add Doctor'});
});

router.get("/add_pharma", (req,res) => {
  res.render("add_pharma", {title: 'Add Pharmacitical Company'});
});

router.get("/add_drug", (req,res) => {
  res.render("add_drug", {title: 'Add Drug'});
});

router.get("/add_symptom", (req,res) => {
  res.render("add_symptom", {title: 'Add Symptom'});
});

router.get("/add_prescription", (req,res) => {
  res.render("add_prescription", {title: 'Add Symptom'});
});

module.exports = router;