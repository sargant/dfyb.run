const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

export const webpack = {
  plugins: {
    add: [
      new WindiCSSWebpackPlugin({
        virtualModulePath: 'src'
      })
    ]
  }
}
