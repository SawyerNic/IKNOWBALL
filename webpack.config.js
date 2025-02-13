const path = require('path');

module.exports = {
    entry: {
        example1: './client/landingPage.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'mainbundle.js',
    },
};