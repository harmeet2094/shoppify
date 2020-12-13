const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
       res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
      }); 
};

exports.postLogin = (req, res, next) => {  
  User.findById('5fbe6606048d6d3d1c07b724')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      if(err)
      console.log(err);

      res.redirect('/');
    });    
  })
  .catch(err => {console.log(err)});    
};

exports.postLogout = (req, res, next) => {  
  req.session.destroy((err) => {
    if(err) 
    console.log(err);
    res.redirect('/');
  });    
};