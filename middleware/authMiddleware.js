const jwt = require('jsonwebtoken');

const patientAuth = (req,res, next) => {
  const token = req.cookies.jwt;

  //check json web token exists & is verified
  if(token){
    jwt.verify(token, 'Smart Pharma Patient', (err, decodedToken) => {
      if(err){
        res.redirect('/patient/login');
      }else{
        next();
      }
    })
  }
  else{
    res.redirect('/patient/login');
  }
}

const adminAuth = (req,res, next) => {
  const token = req.cookies.jwt;

  //check json web token exists & is verified
  if(token){
    jwt.verify(token, 'Smart Pharma Patient', (err, decodedToken) => {
      if(err){
        res.redirect('/admin/login');
      }else{
        next();
      }
    })
  }
  else{
    res.redirect('/admin/login');
  }
}

module.exports = patientAuth;
module.exports = adminAuth;

