module.exports = {
    entry: [
        "./src/Index.js"
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./dist"
    }
};
