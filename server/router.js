const controllers = require('./controllers');

const router = (app) => {

  app.get('/singlePlayer', controllers.game.singlePlayer);
  app.get('/hostPage', controllers.host.hostPage);
  app.get('/', controllers.home.landingPage);
  app.use('*', (req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;