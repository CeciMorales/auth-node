
let router = require('express').Router();
let homepageController = require('../controllers/HomepageController');
let authController = require('../controllers/AuthController');

let authValidator = require('../validators/AuthValidators');
let authPermissions = require('../validators/AuthPermissions');

let passport = require('passport');

router.get('/', homepageController.index);

// Authentication routes
router.get('/login', authController.login);
router.get('/register', authController.register);

router.post('/register', authValidator.store, authController.store);
router.post('/login', passport.authenticate('local',
                                                    { failureRedirect: '/login-fail',
                                                    successRedirect: '/protected' }));

router.get('/protected', (req, res) => {
  res.send('Usuario logueado con éxito');
});
router.get('/login-fail', (req, res) => {
  res.send('El usuario no tiene una sesión válida');
});

router.get('/dashboard', authPermissions.isAuthenticated,
                         authPermissions.showDashboard,
                         authController.dashboard);

router.get('/show-users', authPermissions.isAuthenticated,
                          authPermissions.showUsers,
                          authController.showUsers);
module.exports = router;
