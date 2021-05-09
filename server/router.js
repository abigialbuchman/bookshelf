const controllers = require('./controllers');
const mid = require('../middlewear');

const router = (app) => {
  app.get('/getToken', mid.requireSecure, controllers.Account.getToken);
  app.get('/getBooks', mid.requiresLogin, controllers.Books.getBooks);
  app.get('/getShelf', mid.requiresLogin, controllers.Shelf.getShelf);
  app.get('/login', mid.requireSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requireSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requireSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  /*
  keep for Shelf to Books integration later
  app.get('/maker', mid.requiresLogin, controllers.Books.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Books.add);
  */
  app.get('/shelf', mid.requiresLogin, controllers.Shelf.makerPage);
  app.post('/shelf', mid.requiresLogin, controllers.Shelf.add);
  app.get('/browse', mid.requiresLogin, controllers.Shelf.browse);
  app.get('/', mid.requireSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
