const UserModel = require('../models/User');
//
const { validationResult } = require('express-validator');
///


exports.login = (req, res) => {
  res.render('auth/login', { layout: 'auth' });
}

exports.register = (req, res) => {
  res.render('auth/register',
  {
    layout: 'auth',
    errors: req.flash('errors')
  });
}

exports.store = (req, res) => {
   // Identifica si hubieron errores en el request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     // Si los hubieron entonces regresa a la petición anterior
      req.flash('errors', errors.array());
      return res.redirect('back');
    }
  res.send('Registrar usuario');
  console.log(req.body);
  UserModel.create(req.body)
    .then((data) => {
      console.log('bien?')
    })
    .catch((error) => {
      console.log(error);
    });
}
