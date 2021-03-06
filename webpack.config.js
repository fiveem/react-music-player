var path = require("path");

module.exports = {
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "index.js",
        library: "MusicPlayer",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    entry: path.resolve(__dirname, 'src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]__[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpe?g|gif|mp3|woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
              }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};