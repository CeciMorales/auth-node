exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }else{
    res.redirect('/register');
  }
}

exports.showDashboard = (req, res, next) => {
    if (req.user.role == 'admin' ||  req.user.role == 'user') {
      next();
    }else{
      res.status(403);
      return res.send('No puedes entrar')
    }
}

exports.showUsers = (req, res, next) => {
  if (req.user.role == 'admin') {
    next();
  } else {
    res.status(403);
    return res.send('No puedes entrar')
  }
}
