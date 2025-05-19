const landingPage = (req, res) => res.render('landingPage');
const hostPage = (req, res) => res.render('hostPage');
const gamePage = (req, res) => res.render('gamePage');
const contributersPage = (req, res) => res.render('contributers');

module.exports = {
    landingPage,
    hostPage,
    gamePage, 
    contributersPage
}