const {VueLoaderPlugin} =require('vue-loader')



module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        Vue: ['./src/Frontend/App.js',]
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},

        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};