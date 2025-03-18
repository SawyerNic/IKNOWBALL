const lobby = (req, res) => res.render('lobby');
const landingPage = (req, res) => res.render('landingPage');
const hostPage = (req, res) => res.render('hostPage');

module.exports = {
    lobby,
    landingPage,
    hostPage
}