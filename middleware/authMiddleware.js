const jwt = require('jsonwebtoken');

const requireAuth = (req,res, next) => {
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

module.exports = requireAuth;
