// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { watch } = require('fs');

const isProduction = process.env.NODE_ENV === 'development';


const config = {
    entry: './client/landingPage.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]bundle.js',
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
