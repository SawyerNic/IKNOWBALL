require('@babel/register')({
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
  ],
});

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const socketSetup = require('./controllers/io.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const originalLog = console.log;

console.log = (...args) => {
    const stack = new Error().stack.split('\n')[2]; 
    const match = stack.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
        const [, file, line, column] = match;
        originalLog(`[${file}:${line}:${column}]`, ...args);
    } else {
        originalLog(...args); 
    }
};

const router = require('./router');

const app = express();


app.use('/assets', express.static(path.resolve(`${__dirname}/../dist`)));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  extended: true,
}));
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: '',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');

router(app);

const server = socketSetup(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});