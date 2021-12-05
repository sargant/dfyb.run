import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'

export const webpack = {
  plugins: {
    add: [
      new WindiCSSWebpackPlugin({
        virtualModulePath: 'src'
      })
    ]
  }
}
