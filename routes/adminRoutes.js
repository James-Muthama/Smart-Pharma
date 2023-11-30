const express = require('express');
const Patient = require('../models/patient');
const requireAuth = require('../middleware/authMiddleware');router
const jwt = require('jsonwebtoken');


const router = express.Router();


router.get("/login", (req, res) => {
  res.render('admin_login', {title: 'Admin Login'});
});

router.get("/page", (req, res) => {
  res.render('admin_page', {title: 'Admin Page'});
});

module.exports = router;