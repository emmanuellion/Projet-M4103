const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    second: './src/details.js',
    pop: './src/pop.js'
  },
  output: {
    filename: './[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.(scss|css)$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 }},
              'sass-loader'
            ]
        },
        {
            test: /\.(ico|png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'assets/images/[hash][ext][query]'
            }
        },
        {
            test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'assets/fonts/[hash][ext][query]'
            }
        }
    ]
  }
}
