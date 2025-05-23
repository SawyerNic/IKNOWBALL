const controllers = require('./controllers');

const router = (app) => {

  // app.get('/allGames', controllers.server.allGames);
  app.get('/contributers', controllers.contributers.contributersPage);
  app.get('/gamePage', controllers.game.gamePage);
  app.get('/hostPage', controllers.host.hostPage);
  app.get('/', controllers.home.landingPage);
  app.use('*', (req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;