module.exports = {
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
    
        svgRule.uses.clear();
    
        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');

          config
          .plugin('html')
          .tap(args => {
            args[0].title = 'DA - System Info'
            return args
          })
      },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            buildOptions: {
                productName: 'DA - System Info',
                win: {
                    productName: 'DA - System Info',
                    icon: './public/icon.png'
                }
            }
        },
    }
}