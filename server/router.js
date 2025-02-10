const controllers = require('./controllers');
//const mid = require('./middleware');

const router = (app) => {

  app.get('/', controllers.home.landingPage);
  app.use('*', (req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;