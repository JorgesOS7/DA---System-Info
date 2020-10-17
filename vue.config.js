module.exports = {
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